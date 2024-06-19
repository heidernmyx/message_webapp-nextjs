import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {

  console.log('inside fetch')

  const { email, password,
    username, firstName, middleName, lastName,
    gender, birthdate, checkbox
  } = await req.json();

  let id: string| any;
  let creationDate: string | any;

  try {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    console.log("Result is: ",data)
    console.log("Error is", error)

    id = data.user?.id
    creationDate = data.user?.created_at

    if (id) {
      handler()
    }
    console.log(id)
  } catch (error) {
    console.log(error)
  }
  return NextResponse.json({ message: "Success"})
}


async function handler() {
  
  return
}