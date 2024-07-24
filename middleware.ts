'use server'
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { _delete } from './app/api/cookieActions/route';

export async function middleware(req: NextRequest) {

  // console.log("middleware ran")
  const cookieStore = cookies();
  const { pathname } = req.nextUrl;
  const accessToken = cookieStore.get('access_token')?.value;

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);

  if (pathname === '/' || pathname === '') {
    const result = accessToken ? NextResponse.redirect(new URL('/dashboard', req.url)) : NextResponse.redirect(new URL('/login', req.url));
    if (result) return result;
  }

  if (pathname === '/login' || pathname === '/register') {
    const result = accessToken ? NextResponse.redirect(new URL('/dashboard', req.url)) : console.log('no access token')
    return result
  }

  if (pathname === '/dashboard') {
    if (!accessToken) {
      // Redirect to login if the access token is not present
      console.log("no access token")
      // _delete();
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Create a Supabase client with the access token
  // Allow the request to proceed if the user is authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard', '/register'],
};
