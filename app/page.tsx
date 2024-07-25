import React from 'react'
import Login from './login/page';
// import { SessionProvider } from 'next-auth/react';


export default function Home() {


  return (
    <>
      {/* <SessionProvider> */}
        <div className="overflow-hidden">
          <Login/>
        </div>
      {/* </SessionProvider> */}
    </>
  );
}
