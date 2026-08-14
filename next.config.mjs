/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    // Proxy WordPress admin, login, and REST API requests to the original
    // WordPress server. This avoids needing a separate subdomain — the client
    // can keep using galcare.com/wp-admin as usual.
    const wpOrigin = process.env.WORDPRESS_ORIGIN_URL || "http://118.139.178.174"

    return {
      // "beforeFiles" rewrites run before Next.js pages, so /wp-admin
      // is intercepted before Next.js tries to render a 404.
      beforeFiles: [
        {
          source: "/wp-admin",
          destination: `${wpOrigin}/wp-admin`,
        },
        {
          source: "/wp-admin/:path*",
          destination: `${wpOrigin}/wp-admin/:path*`,
        },
        {
          source: "/wp-login.php",
          destination: `${wpOrigin}/wp-login.php`,
        },
        {
          source: "/wp-json/:path*",
          destination: `${wpOrigin}/wp-json/:path*`,
        },
        {
          source: "/wp-content/:path*",
          destination: `${wpOrigin}/wp-content/:path*`,
        },
        {
          source: "/wp-includes/:path*",
          destination: `${wpOrigin}/wp-includes/:path*`,
        },
        {
          source: "/xmlrpc.php",
          destination: `${wpOrigin}/xmlrpc.php`,
        },
      ],
    }
  },
}

export default nextConfig
