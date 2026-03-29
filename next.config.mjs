export default {
  experimental: {
    appDir: true,
    runtime: 'nodejs',
    serverComponents: true,
  },
  future: {
    webpack5: true,
  },
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  swcMinify: true,
  compilerOptions: {
    react: {
      runtime: 'automatic',
      version: '18.2.0',
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  tailwindcss: {},
  env: {
    NEXT_PUBLIC_APP_NAME: 'AutoGen Docs',
    NEXT_PUBLIC_APP_DESCRIPTION: 'AutoGen Docs generates high-quality API documentation automatically, saving developers time and effort.',
    NEXT_PUBLIC_SEO_KEYWORDS: 'API documentation tools, API documentation generator, auto generate API docs, API doc generator, swagger alternative',
  },
};