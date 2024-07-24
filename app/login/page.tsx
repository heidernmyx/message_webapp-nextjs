"use client"
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { ModeToggle } from "../../components/ui/mode-toggle";
import FormTitle from "@/components/form_title";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { loginSchema } from '@/lib/zod';
import { signIn } from 'next-auth/react';


type LoginInput = z.infer<typeof loginSchema>;

const Login: React.FC = () => { 
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const addcss_loadingBg = isSubmitting ? "cursor-wait" : "hover:bg-opacity-35";
  const loginButtoncss = `w-[100%] border-[1.5px] rounded h-[6vh] ${addcss_loadingBg}`;

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {

      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // })

      const response = await signIn('credentials', {
        email: data.email,
        password: data.password
      })
      
      // const result = await response.json();
      // console.log(result);  
      // const { data: userData, error} = result
      console.log(response)

      if (response!.error) {
        // const { message, status} = error;
        console.log(response!.error)
        setLoginMessage('Invalid Credentials')
      }
      else if (response?.ok) {
        // const { id, aud, role, email } = userData;
        // console.log(userData)
        window.location.reload();
      }
    } catch (err) {
      console.log("error happened")
    }
  };

  const [ loginMessage, setLoginMessage ] = useState("");

  // useEffect(() => {

  // }[loginMessage])

  return (
    <>
    <div className="">
      <div className="flex justify-center items-center mt-[14vh]">
        <div className="w-[30vw] border-black border rounded-[10px] px-[6vh] pt-[6vh] pb-[6vw] bg-stone-500/10">
          <FormTitle title="Login" />
          <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label>Email</Label>
              <Input type="text" {...register("email")} className="mt-[0.6vw]" />
              {errors.email && (<div className="text-red-500 text-sm">{errors.email.message}</div>)}
              <div className="p-[0.6vw]" />
              <Label className="">Password</Label>
              <Input type="password" {...register("password")} className="my-[1vh]" />
              {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
              <br />
              <Button className={loginButtoncss} type="submit">Login</Button>
              { loginMessage && <div className="text-red-500 text-base">{loginMessage}</div>}
            </form>
          <br />
          <div>
            <p>Don&apos;t have an Account yet? <Link className="underline cursor-pointer" href="/register">Register here!</Link></p>
          </div>
        </div>
      </div>
      <div className='fixed top-1 right-1 mt-1 mr-1'>
        <ModeToggle/>
      </div>
    </div>
    
    </>
  );
}

export default Login;
