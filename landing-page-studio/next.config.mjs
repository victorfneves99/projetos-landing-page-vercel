/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "img-src 'self' data: blob: https:",
      "style-src 'self' 'unsafe-inline' https://sdk.mercadopago.com",
      "font-src 'self' data: https:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://sdk.mercadopago.com https://http2.mlstatic.com https://www.mercadolibre.com https://*.mercadolibre.com",
      "script-src-elem 'self' 'unsafe-inline' https://sdk.mercadopago.com https://http2.mlstatic.com https://www.mercadolibre.com https://*.mercadolibre.com",
      "connect-src 'self' https://api.mercadopago.com https://sdk.mercadopago.com https://http2.mlstatic.com https://www.mercadolibre.com https://*.mercadolibre.com https://*.mercadopago.com",
      "frame-src 'self' https://www.mercadopago.com https://*.mercadopago.com https://www.mercadolibre.com https://*.mercadolibre.com",
      "worker-src 'self' blob: https://http2.mlstatic.com https://www.mercadolibre.com https://*.mercadolibre.com",
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
    ]
  },
}

export default nextConfig
