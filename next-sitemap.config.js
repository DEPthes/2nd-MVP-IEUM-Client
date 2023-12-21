/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://ieum.depth-mju.co.kr',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 1,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
