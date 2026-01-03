import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = new URL(request.url);
  const TARGET_HOST = 'www.google.com';

  // 检查是否已经是重定向循环
  if (url.searchParams.has('vercel-proxy')) return NextResponse.next();

  // 构造目标 URL，保持 pathname 和 search 完全一致
  const targetUrl = new URL(url.pathname + url.search, `https://${TARGET_HOST}`);
  if (!targetUrl.searchParams.has('gws_rd')) {
    targetUrl.searchParams.set('gws_rd', 'cr');
  }
  const requestHeaders = new Headers(request.headers);

    // 1. 使用一个非常真实的浏览器 UA
    requestHeaders.set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36');

    // 2. 设置接受语言，匹配你 Vercel 节点的地理位置
    requestHeaders.set('accept-language', 'en-US,en;q=0.9');

    // 3. 抹除可能会暴露你代理身份的 Header
    requestHeaders.delete('x-vercel-id');
    requestHeaders.delete('x-forwarded-for');

  requestHeaders.set('host', TARGET_HOST);

  // 显式告诉 Vercel 这是重写，不要进行规范化跳转
  return NextResponse.rewrite(targetUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // 覆盖所有路径，特别是 /search
  matcher: ['/:path*'],
};
