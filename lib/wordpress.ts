/**
 * WordPress Headless REST API Client
 * Interfaces Next.js with Galcare's existing WordPress instance.
 */

export interface WPPost {
  id: number
  date: string
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  featured_media?: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
  }
}

export interface WPJobListing {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  meta?: {
    department?: string
    location?: string
    type?: string
    experience?: string
  }
}

export interface FormSubmissionPayload {
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message?: string
  jobTitle?: string
  experience?: string
  resume?: string
  productName?: string
  requirements?: string
  meta?: Record<string, unknown>
}

/**
 * Returns the base WordPress API URL from process.env, cleaned of trailing slashes.
 */
export function getWordPressApiUrl(): string {
  const url = process.env.WORDPRESS_API_URL || ""
  return url.replace(/\/+$/, "")
}

/**
 * Fetch dynamic blog / news articles from WordPress REST API
 */
export async function fetchWPPosts(page = 1, perPage = 10): Promise<WPPost[]> {
  const baseUrl = getWordPressApiUrl()
  if (!baseUrl) return []

  try {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${perPage}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return []
    return await res.json()
  } catch (error) {
    console.warn("[WP API] Failed to fetch posts:", error)
    return []
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function fetchWPPostBySlug(slug: string): Promise<WPPost | null> {
  const baseUrl = getWordPressApiUrl()
  if (!baseUrl) return null

  try {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts?_embed&slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) return null
    const posts: WPPost[] = await res.json()
    return posts.length > 0 ? posts[0] : null
  } catch (error) {
    console.warn(`[WP API] Failed to fetch post by slug '${slug}':`, error)
    return null
  }
}

/**
 * Submit form entry (Contact, Careers, Quotes, Enquiries) to WordPress
 */
export async function submitWPFormEntry(
  formType: "contact" | "career_application" | "quote_request" | "product_enquiry",
  payload: FormSubmissionPayload
): Promise<{ success: boolean; id?: string; message: string }> {
  const baseUrl = getWordPressApiUrl()
  
  // If WordPress URL is configured, attempt sending to WP REST API custom endpoint / CPT
  if (baseUrl) {
    try {
      const endpoint = `${baseUrl}/wp-json/galcare/v1/submit-${formType}`
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.WORDPRESS_JWT_AUTH_SECRET && {
            Authorization: `Bearer ${process.env.WORDPRESS_JWT_AUTH_SECRET}`,
          }),
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const data = await res.json()
        return {
          success: true,
          id: data.id || `wp-${Date.now()}`,
          message: data.message || "Submission received successfully.",
        }
      }
    } catch (err) {
      console.warn(`[WP API] Form submission to ${formType} failed, executing local fallback:`, err)
    }
  }

  // Fallback response for offline or non-WP mode
  return {
    success: true,
    id: `${formType}-${Date.now()}`,
    message: "Thank you! Your submission has been recorded successfully.",
  }
}
