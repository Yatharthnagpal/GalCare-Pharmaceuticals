import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/products-db'
import { NEWS } from '@/lib/site-data'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://galcare.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/about/vision-values',
    '/about/milestones',
    '/about/rd-quality',
    '/products',
    '/divisions/dermatology',
    '/divisions/third-party-manufacturing',
    '/careers',
    '/opportunities',
    '/apply',
    '/contact',
    '/news',
    '/quality',
    '/research',
    '/certifications',
    '/facilities',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/products' ? 0.9 : 0.8,
  }))

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${BASE_URL}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const newsRoutes = NEWS.map((news) => ({
    url: `${BASE_URL}/news/${news.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes, ...newsRoutes]
}
