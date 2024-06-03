/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const { env } = await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: env.NEXT_PUBLIC_BACKEND_PROTOCOL,
        hostname: env.NEXT_PUBLIC_BACKEND_HOST,
        port: env.NEXT_PUBLIC_BACKEND_PORT,
      },
    ],
  },
};

export default config;
