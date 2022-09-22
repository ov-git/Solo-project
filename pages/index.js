
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Register from '../components/Register'
import React, { useEffect, useState } from 'react'
import { getAll } from '../lib/ApiService'
import prisma from '../lib/prisma'
import Showcase from '../components/Showcase'
// import { PrismaClient } from '@prisma/client';


export const getServerSideProps = async () => {

  const users = await prisma.user.findMany();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};

export default function Home(props) {

  const [drinks, setDrinks] = useState([]);
  const [showcase, setShowcase] = useState('');

  useEffect(() => {
    getDrinks();
    // console.log(props)
  }, []);

  const getDrinks = async () => {
    const data = await getAll();
    setDrinks(data);
  }


  return (
    <div className="text-4xl h-[100vh] w-[98.2vw]">
      <Navbar />
      {showcase ? <Showcase showcase={showcase} setShowcase={setShowcase} />: <></>}
      <Main drinks={drinks} setShowcase={setShowcase} />
      {/* <Register /> */}
    </div>
  )
}

