import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authPages = ['/login' , '/register', '/frogot-password'];
const privtePages = ['/' , '/exams' , '/dashboard'];

export default async function middleware(request:NextRequest){
    const token = await getToken({req:request});
    const currentUrl = request.nextUrl.pathname;

    // if the user is loggedin and try to go to auths pages
    if(token && authPages.includes(currentUrl) ){
        const redicrectUrl = new URL('/' , request.nextUrl.origin);
        return NextResponse.redirect(redicrectUrl)
    }

    // if the user is not loggedin and try to go to privet pages
    if(!token && privtePages.includes(currentUrl)){
        const redicrectUrl = new URL('/login' , request.nextUrl.origin);
        return NextResponse.redirect(redicrectUrl);
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }