import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "standalone",
  sassOptions: {
    // additionalData: `@use "styles/variables" as *;`,
  },
}

export default nextConfig
