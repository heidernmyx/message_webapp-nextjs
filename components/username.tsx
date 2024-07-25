"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'

const Username = () => {

  const { data: session} = useSession();

  useEffect(() => {
    console.log(session)

  }, [])
  return (
    <div>{session?.user?.email}</div>
  )
}

export default Username