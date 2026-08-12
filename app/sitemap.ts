import { MetadataRoute } from "next"
import { PRODUCTS } from "@/lib/products-db"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://galcare.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/about/vision-values",
    "/about/milestones",
    "/about/rd-quality",
    "/products",
    "/divisions/dermatology",
    "/divisions/third-party-manufacturing",
    "/careers",
    "/careers/opportunities",
    "/contact",
    "/news",
    "/quality",
    "/research",
    "/certifications",
    "/facilities",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }))

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${SITE_URL}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes]
}
