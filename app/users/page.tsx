import React from 'react'
import Image from 'next/image'


interface User {
  id: number,
  title: string,
  url: string,
}

const page = async () => {
  
  const res = await fetch('https://jsonplaceholder.typicode.com/photos')
  const users: User[] = await res.json();
  
  return (
    <div>page
      {users.map( user => <li key={user.id}>{user.title}
      <Image alt='image' src={user.url}
        width={250} height={250}/>
      </li>)}
    </div>

  )
}

export default page