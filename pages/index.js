
import { useEffect, useState } from 'react'
import { getAll } from '../lib/ApiService'
import prisma from '../lib/Prisma'

import Navbar from '../src/components/Navbar'
import Main from '../src/components/Main'
import Showcase from '../src/components/Showcase'
import Hero from '../src/components/Hero'

export const getStaticProps = async () => {

  await prisma.$connect();
  const data = await getAll();

  return {
    props: {
      drinks: data,
    },
  };
};

export default function Home(props) {

  const [drinks, setDrinks] = useState([]);
  const [showcase, setShowcase] = useState('');

  useEffect(() => {
    setDrinks(props.drinks);
  }, []);

  return (
    <div className="text-4xl h-[70vh] xl:h-[75vh] w-full">
      <Navbar />
      {showcase && <Showcase showcase={showcase} setShowcase={setShowcase} />}
      <Hero />
      <Main drinks={drinks} setShowcase={setShowcase} />
    </div>
  )
}

