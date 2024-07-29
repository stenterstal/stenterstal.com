const isProd = process.env.NODE_ENV === 'production'
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    // assetPrefix: isProd ? '/' : '',
    distDir: 'dist',
    images:{
        unoptimized: true
    }

    // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
    // trailingSlash: true,

    // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
    // skipTrailingSlashRedirect: true,
}

module.exports = nextConfig