/** @type {import('next').NextConfig} */
export default {
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.microcms-assets.io" }],
  },
};
