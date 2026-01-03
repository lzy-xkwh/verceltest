/** @type {import('next').NextConfig} */
const nextConfig = {
    // 核心配置：禁用斜杠自动规范化
    trailingSlash: false, 
    // 跳过中间件的 URL 预处理
    skipMiddlewareUrlNormalize: true,
    // 必须禁用此项以防止 Vercel 自动重定向
    skipTrailingSlashRedirect: true,
  };
  
  module.exports = nextConfig;
  