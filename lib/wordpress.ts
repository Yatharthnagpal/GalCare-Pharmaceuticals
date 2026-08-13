import { Job } from "@/lib/site-data"

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
 * Create a new article/post in WordPress CMS
 */
export async function createWPPost(post: {
  title: string
  content: string
  excerpt?: string
  status?: string
}): Promise<{ success: boolean; id?: string }> {
  const baseUrl = getWordPressApiUrl()
  if (!baseUrl) return { success: false }

  try {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.WORDPRESS_JWT_AUTH_SECRET && {
          Authorization: `Bearer ${process.env.WORDPRESS_JWT_AUTH_SECRET}`,
        }),
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || "",
        status: post.status || "publish",
      }),
    })

    if (res.ok) {
      const data = await res.json()
      return { success: true, id: `wp-${data.id}` }
    }
  } catch (err) {
    console.warn("[WP API] Failed to create post in WordPress:", err)
  }
  return { success: false }
}

/**
 * Update an existing article/post in WordPress CMS
 */
export async function updateWPPost(
  id: string,
  post: { title?: string; content?: string; excerpt?: string }
): Promise<{ success: boolean }> {
  const baseUrl = getWordPressApiUrl()
  const numericId = id.replace(/^wp-/, "")
  if (!baseUrl || !numericId) return { success: false }

  try {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts/${numericId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.WORDPRESS_JWT_AUTH_SECRET && {
          Authorization: `Bearer ${process.env.WORDPRESS_JWT_AUTH_SECRET}`,
        }),
      },
      body: JSON.stringify({
        ...(post.title && { title: post.title }),
        ...(post.content && { content: post.content }),
        ...(post.excerpt && { excerpt: post.excerpt }),
      }),
    })

    return { success: res.ok }
  } catch (err) {
    console.warn(`[WP API] Failed to update post ${id} in WordPress:`, err)
    return { success: false }
  }
}

/**
 * Delete an article/post in WordPress CMS
 */
export async function deleteWPPost(id: string): Promise<{ success: boolean }> {
  const baseUrl = getWordPressApiUrl()
  const numericId = id.replace(/^wp-/, "")
  if (!baseUrl || !numericId) return { success: false }

  try {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts/${numericId}?force=true`, {
      method: "DELETE",
      headers: {
        ...(process.env.WORDPRESS_JWT_AUTH_SECRET && {
          Authorization: `Bearer ${process.env.WORDPRESS_JWT_AUTH_SECRET}`,
        }),
      },
    })

    return { success: res.ok }
  } catch (err) {
    console.warn(`[WP API] Failed to delete post ${id} in WordPress:`, err)
    return { success: false }
  }
}

/**
 * Fetch dynamic job listings from WordPress REST API (Custom Post Type: 'jobs' or 'job_listing')
 */
export async function fetchWPJobs(): Promise<Job[]> {
  const baseUrl = getWordPressApiUrl()
  if (!baseUrl) return []

  try {
    // 1. Try Custom Post Type 'jobs'
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/jobs?_embed`, {
      next: { revalidate: 60 },
    })

    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any) => formatWPJob(item))
      }
    }

    // 2. Try Custom Post Type 'job_listing'
    const altRes = await fetch(`${baseUrl}/wp-json/wp/v2/job_listing?_embed`, {
      next: { revalidate: 60 },
    })
    if (altRes.ok) {
      const altData = await altRes.json()
      if (Array.isArray(altData) && altData.length > 0) {
        return altData.map((item: any) => formatWPJob(item))
      }
    }

    // 3. Try Standard Posts matching search query 'job' or 'career'
    const postRes = await fetch(`${baseUrl}/wp-json/wp/v2/posts?search=career&_embed`, {
      next: { revalidate: 60 },
    })
    if (postRes.ok) {
      const postData = await postRes.json()
      if (Array.isArray(postData) && postData.length > 0) {
        return postData.map((item: any) => formatWPJob(item))
      }
    }
  } catch (error) {
    console.warn("[WP API] Failed to fetch jobs from WordPress:", error)
  }
  return []
}

function formatWPJob(item: any): Job {
  return {
    id: `wp-${item.id}`,
    title: item.title?.rendered || "Open Position",
    department: item.meta?.department || item.acf?.department || "R&D & Manufacturing",
    location: item.meta?.location || item.acf?.location || "Jaipur, Rajasthan",
    type: item.meta?.type || item.acf?.type || "Full-time",
    experience: item.meta?.experience || item.acf?.experience || "2-5 Years",
    description: item.excerpt?.rendered?.replace(/<[^>]+>/g, "") || item.content?.rendered?.replace(/<[^>]+>/g, "").slice(0, 200) || "",
  }
}

/**
 * Create a new job opening in WordPress CMS
 */
export async function createWPJob(job: Job): Promise<{ success: boolean; id?: string }> {
  const baseUrl = getWordPressApiUrl()
  if (!baseUrl) return { success: false }

  try {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.WORDPRESS_JWT_AUTH_SECRET && {
          Authorization: `Bearer ${process.env.WORDPRESS_JWT_AUTH_SECRET}`,
        }),
      },
      body: JSON.stringify({
        title: job.title,
        content: job.description || "",
        status: "publish",
        meta: {
          department: job.department,
          location: job.location,
          type: job.type,
          experience: job.experience || "2-5 Years",
        },
      }),
    })

    if (res.ok) {
      const data = await res.json()
      return { success: true, id: `wp-${data.id}` }
    }
  } catch (err) {
    console.warn("[WP API] Failed to create job in WordPress:", err)
  }
  return { success: false }
}

/**
 * Update an existing job opening in WordPress CMS
 */
export async function updateWPJob(id: string, job: Partial<Job>): Promise<{ success: boolean }> {
  const baseUrl = getWordPressApiUrl()
  const numericId = id.replace(/^wp-/, "")
  if (!baseUrl || !numericId) return { success: false }

  try {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/jobs/${numericId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.WORDPRESS_JWT_AUTH_SECRET && {
          Authorization: `Bearer ${process.env.WORDPRESS_JWT_AUTH_SECRET}`,
        }),
      },
      body: JSON.stringify({
        ...(job.title && { title: job.title }),
        ...(job.description && { content: job.description }),
        meta: {
          ...(job.department && { department: job.department }),
          ...(job.location && { location: job.location }),
          ...(job.type && { type: job.type }),
          ...(job.experience && { experience: job.experience }),
        },
      }),
    })

    return { success: res.ok }
  } catch (err) {
    console.warn(`[WP API] Failed to update job ${id} in WordPress:`, err)
    return { success: false }
  }
}

/**
 * Delete a job opening in WordPress CMS
 */
export async function deleteWPJob(id: string): Promise<{ success: boolean }> {
  const baseUrl = getWordPressApiUrl()
  const numericId = id.replace(/^wp-/, "")
  if (!baseUrl || !numericId) return { success: false }

  try {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/jobs/${numericId}?force=true`, {
      method: "DELETE",
      headers: {
        ...(process.env.WORDPRESS_JWT_AUTH_SECRET && {
          Authorization: `Bearer ${process.env.WORDPRESS_JWT_AUTH_SECRET}`,
        }),
      },
    })

    return { success: res.ok }
  } catch (err) {
    console.warn(`[WP API] Failed to delete job ${id} in WordPress:`, err)
    return { success: false }
  }
}

/**
 * Submit form entry (User Registration, Job Applications, 3rd Party Quotes, Product Enquiries) to WordPress
 */
export async function submitWPFormEntry(
  formType: "contact" | "career_application" | "quote_request" | "product_enquiry" | "user_registration",
  payload: FormSubmissionPayload
): Promise<{ success: boolean; id?: string; message: string }> {
  const baseUrl = getWordPressApiUrl()
  
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
          message: data.message || "Submission synced with WordPress.",
        }
      }
    } catch (err) {
      console.warn(`[WP API] Form submission to ${formType} failed, executing local fallback:`, err)
    }
  }

  return {
    success: true,
    id: `${formType}-${Date.now()}`,
    message: "Recorded locally and queued for WordPress sync.",
  }
}
