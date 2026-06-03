const nextConfig = {
  output: "export",
  turbopack: {
    root: import.meta.dirname
  },
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
