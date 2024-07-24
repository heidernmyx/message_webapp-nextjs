import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { CookieOptions } from '@supabase/ssr';
import { saltAndHashPassword } from '@/app/utils/password';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  console.log(password);
  console.log(saltAndHashPassword(password));
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    const { message, status } = error;
    return NextResponse.json({ error: { message, status } });
  } else if (data) {
    const user = data.user as { id: string; aud: string; role: string; email: string };
    const authToken = data.session?.access_token;
    const { id, aud, role, email } = user;

    // Set cookie code here
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    };

    const cookieStore = cookies();

    if (authToken) {
      cookieStore.set('access_token', authToken, cookieOptions);
    }

    console.log('redirecting to /dashboard');
    // return NextResponse.redirect(new URL('/dashboard', req.url));
    return NextResponse.json({data: { id, aud, role, email}})
  }
}
