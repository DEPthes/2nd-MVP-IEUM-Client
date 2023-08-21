/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://ieum.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 1,
  exclude: '/letter/**',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/letter',
      },
    ],
  },
};
