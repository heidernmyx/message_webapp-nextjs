import { NextRequest, NextResponse } from 'next/server'
import { supabase, servicerole } from '@/lib/supabase'

interface formData{
  email: string
  password: string
  username: string
  firstName: string
  middleName: string
  lastName: string
  gender: string
  birthdate: Date
  checkbox: boolean
}
export async function POST(req: NextRequest) {

  console.log('inside fetch')

  const { email, password,
    username, firstName, middleName, lastName,
    gender, birthdate, checkbox
  }: formData = await req.json();

  let id: string| any;
  let creationDate: string | any;
  // try {
  //   const { data, error} = await supabase
  //   .from('tbl_account')
  //   .select()
  // } catch (error) {
    
  // }

  try {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    console.log("Result is: ",data)
    console.log("Error is", error)

    id = data.user?.id
    // id = "c0c8e31b-48b9-4260-a046-2a7fafda7644"
    // creationDate = data.user?.created_at 
    
    if (error) {
      // console.log(error.message)
      return NextResponse.json({error: {message: error.message}})
    }
    else if (id) { 
      handler(id, email)
    }
    console.log(id)
  } catch (error) {
    console.log(error)
  }

  return NextResponse.json({ message: "Success"})
}

async function handler(id: string, email: string) {
  try {
    const { data, error } = await servicerole
    .from('tbl_account')
    .insert([
      { email: email,
        account_id: id
      }
    ])
    .select()
    
// const { data, error } = await supabase
// .from('tbl_account')
// .insert([
//   { some_column: 'someValue', other_column: 'otherValue' },
// ])
// .select()
        

    if (data) {
      console.log(data)
      // return NextResponse.json({data: {message: data.}})
    }
    else if (error){
      console.log(error)
    //   ! insert or update on table "tbl_account" violates foreign key constraint "tbl_account_account_id_fkey
    }
    // ! message: 'new row violates row-level security policy for table "tbl_account"'
    // {
    //   code: '23503',
    //   details: 'Key is not present in table "identities".',
    //   hint: null,
    //   message: 
    //     'insert or update on table "tbl_account" violates foreign key constraint "tbl_account_account_id_fkey"'
    // }

  } catch (err) {
    console.log(err)
  }
  
  return
}