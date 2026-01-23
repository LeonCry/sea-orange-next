import { getRSSData } from '@/api/blogPageApi';

const SITE_URL = 'https://voidis.me';

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  const posts = await getRSSData();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Voidis's Blog</title>
    <link>${SITE_URL}</link>
    <description>Voidis's personal blog sharing thoughts and tech.</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${posts.map((post: { name: string; id: number; path: string; updateTime: Date; description: string; category: string }) => `
    <item>
      <title>${escapeXml(post.name)}</title>
      <link>${SITE_URL}/blog/${post.id}</link>
      <guid>${SITE_URL}/blog/${post.id}</guid>
      <pubDate>${new Date(post.updateTime).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
