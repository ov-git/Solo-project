
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Register from '../components/Register'
import React, { useEffect, useState } from 'react'
import { getAll } from '../lib/ApiService'
import prisma from '../lib/prisma'
import Showcase from '../components/Showcase'
import { useRouter } from 'next/router'
// import { PrismaClient } from '@prisma/client';


export const getServerSideProps = async () => {

  const users = await prisma.User.findMany();

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
  }, []);

  const getDrinks = async () => {
    const data = await getAll();
    setDrinks(data);
  }


  return (
    <div className="text-4xl h-[90vh] w-[98.2vw]">
      <Navbar />
      {showcase ? <Showcase showcase={showcase} setShowcase={setShowcase} />: <></>}
      <Main drinks={drinks} setShowcase={setShowcase} />
      {/* <Register /> */}
    </div>
  )
}

