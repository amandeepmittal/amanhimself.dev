/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['i.imgur.com', 'res.cloudinary.com', 'i.gr-assets.com', 'cdn-images-1.medium.com', 'miro.medium.com', 'blog.jscrambler.com', 'crowdbotics.ghost.io',
    'img.youtube.com', 'blog.logrocket.com', 'hackernoon.com', 'imgur.com', 'blog.appsignal.com', 'hackernoon.imgix.net', 'appjs.co', 'pbs.twimg.com', '2022.appjs.co', 'jscrambler.com'],
    // next/image support `srcSet` using the below deviceSizes
    // for more info, visit https://nextjs.org/docs/basic-features/image-optimization#device-sizes
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // https://nextjs.org/docs/basic-features/image-optimization#image-sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  typescript: {
    ignoreBuildErrors: true,
  }

};
