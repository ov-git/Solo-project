
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import React, { useEffect, useState } from 'react'
import { getAll } from '../lib/ApiService'
// import prisma from '../lib/prisma'
import {  PrismaClient } from '@prisma/client';


export const getServerSideProps = async () => {

  const prisma = new PrismaClient();  
  const users = await prisma.user.findMany();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};

export default function Home(props) {

  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    getDrinks();
    console.log(props)
  }, []);

  const getDrinks = async () => {
    const data = await getAll();
    setDrinks(data);
  }

  

  return (
    <div className=" text-orange-500 text-4xl h-[100vh] bg-slate-500">
      <Navbar />
      <Main drinks={drinks} />

    </div>
  )
}



// export const getServerSideProps = async ({ req }) => {
//   const token = req.headers.AUTHORIZATION
//   const userId = await getUserId(token)
//   const posts = await prisma.post.findMany({
//     where: {
//       author: { id: userId },
//     },
//   })
//   return { props: { posts } }
// }
