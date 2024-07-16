import React from 'react'

import Link from 'next/link'
import { z } from 'zod';
import FormTitle from '../components/form_title';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import Form_input from '../components/form_input';
import { ModeToggle } from '../components/ui/mode-toggle';

const Register = () => {


  return (
    <div className="flex justify-center">
      <div className="w-[32vw] border-l border-r border-black py-[5vh] px-[3vw] bg-stone-500/10">
        <Form_input/>
        <p className='mt-[1vw]'>Already have an account? <Link className='underline' href='/login'>Login here!</Link></p>
      </div>
      <div className='absolute right-1 mt-1'>
        <ModeToggle/>
      </div>
    </div>
  )
}

export default Register