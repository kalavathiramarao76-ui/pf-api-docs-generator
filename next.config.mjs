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
    domains: ['localhost'],
  },
  reactStrictMode: true,
  swcMinify: true,
  compilerOptions: {
    // @ts-ignore
    react: {
      runtime: 'automatic',
      version: '18.2.0',
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // @ts-ignore
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_SEO_KEYWORDS: 'API documentation tools, API documentation generator, auto generate API docs, API doc generator, API documentation software',
    NEXT_PUBLIC_SEO_DESCRIPTION: 'AutoGenerate API Documentation',
  },
}