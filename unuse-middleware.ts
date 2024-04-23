// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// export async function middleware(request: NextRequest) {
//   const pathName = request.nextUrl.pathname;
//   const response = NextResponse.next();
//   response.headers.set('x-middleware', 'true');
//   return response;
// }
// export const config = {
//   matcher: '/:path*',
// };