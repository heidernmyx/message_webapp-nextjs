import { NextRequest, NextResponse } from 'next/server'
import { supabase, servicerole } from '@/lib/supabase'
import { verifyPassword, saltAndHashPassword } from '@/app/utils/password'

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

  try {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    id = data.user?.id
    
    if (error) {
      // console.log(error.message)
      return NextResponse.json({error: {message: error.message}})
    }
    else if (id) { 
      handler(id, email, username, firstName, middleName, lastName, gender, birthdate)
    }
    console.log(id)
  } catch (error) {
    console.log(error)
  }

  return NextResponse.json({ message: "Success"})
}

async function handler(id: string, email: string,
  username: string, firstName: string,
  middleName: string, lastName: string,
  gender: string, birthdate: Date) {
  try {

    console.log(true)
    const { data: accountData, error: accountError } = await servicerole
    .from('tbl_account')
    .insert([
      { account_id: id,
        email: email,
        account_username: username }
    ])
    .select()
    
    if (accountData) {
      console.log(accountData)
      // return NextResponse.json({data: {message: data.}})
    }
    else if (accountError){
      console.log(accountError)
    //   ! insert or update on table "tbl_account" violates foreign key constraint "tbl_account_account_id_fkey
    }
    // ! message: 'new row violates row-level security policy for table "tbl_account"'

    const { data: profileData, error: profileError } = await supabase
    .from('tbl_profile')
    .insert([
      { account_id: id, 
        fname: firstName, 
        mname: middleName, 
        lname: lastName, 
        gender: gender, 
        birthdate: birthdate },
    ])
    .select()

    console.log(profileData);
    console.log(profileError);
    
    if (!profileData || profileError) {

    }
    else if (profileData) {

    }

  } catch (err) {
    console.log(err)
  }
  

  try {
    
  } catch (err) {
    
  }
  return
}