import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add a rule to handle .html files
    config.module.rules.push({
      test: /\.html$/,
      use: [
        {
          loader: "html-loader", // Use html-loader for importing HTML files
        },
      ],
    });

    // Add any other necessary configuration here
    return config;
  },
};

export default nextConfig;
