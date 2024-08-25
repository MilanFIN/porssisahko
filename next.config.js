/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.cdn.yle.fi",
            },
            {
                protocol: "https",
                hostname: "hs.mediadelivery.fi",
            },
            {
                protocol: "https",
                hostname: "img.ilcdn.fi",
            },
            {
                protocol: "https",
                hostname: "is.mediadelivery.fi",
            },
        ],
    },
};

module.exports = nextConfig;
