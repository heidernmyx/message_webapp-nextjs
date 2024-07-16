'use server'
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



export async function _delete () {

  // console.log("asd")
  // cookies().delete('access_token');
  // cookies().delete('user_id');
  // cookies().delete('email');
  // cookies().delete('role'); 
  // console.log(true)
  // return NextResponse.redirect(new URL('/login'));
  return NextResponse.json({message: "test"})
}