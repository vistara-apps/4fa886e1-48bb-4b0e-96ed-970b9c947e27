/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'ipfs.io', 'gateway.pinata.cloud'],
  },
  env: {
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
  },
}

export default nextConfig
