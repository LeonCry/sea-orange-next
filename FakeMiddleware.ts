// import { FunnyPageItem } from '@prisma/client';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getAllProjectsFromFunny } from './api/funnyPageApi';

// export async function middleware(request: NextRequest) {
//   const secPath = request.url.split("/")[3];
//   const thiPath = request.url.split("/")[4];
//   switch (secPath) {
//     case "funny":
//       const projectInfo: FunnyPageItem[] = await getAllProjectsFromFunny();
//       if (projectInfo.findIndex((item) => item.name === thiPath) === -1) return Response.json(
//         { success: false, message: '404 not found' },
//         { status: 404 }
//       );
//       return NextResponse.next();
//     default:
//       return NextResponse.next();
//   }
// }
// export const config = {
//   matcher: ['/funny/:path*'],
// };