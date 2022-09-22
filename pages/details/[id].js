import React from 'react'
import { useRouter } from 'next/router'

function Id() {
    const router = useRouter()
    console.log(router.query);
  return (
    <div>Id</div>
  )
}

export default Id