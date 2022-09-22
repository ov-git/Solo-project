
import { useEffect, useState } from 'react'
import { getCategory } from '../lib/ApiService';
import Drinks from './Drinks'

import Image from 'next/image';
import cocktail from '../public/cocktail.jpg'

function Main(props) {

  const categories = ["Cocktails", "Shots", "Beer", "Ordinary Drinks"];


  const [category, setCategory] = useState('');
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    getByCategory();
  }, [category])

  const getByCategory = async () => {
    if (category) {
      const data = await getCategory(category);
      setDrinks(data);
    }
  }


  return (
    <div className=' mt-20 h-full w-full flex-col'>
      <div className="p-4 h-36 w-full flex justify-between text-white">
        
        {categories.map((cat) => (
          <div className=' border cursor-pointer border-black h-full shrink-0 grow w-[10vw] m-2 my-0 inline-block bg-cover bg-center overflow-hidden'
            key={cat} onClick={() => setCategory(cat)} style={{ backgroundImage: `url(${cocktail.src})` }}>
            <p className='z-10 absolute'                          >
              {cat}
            </p>

            <div className='bg-black h-full shrink-0 grow w-full opacity-0 hover:opacity-50' />

          </div>
          
        ))}
      </div>

      <div className=' m-0 p-0'>
        <Drinks drinks={drinks} setShowcase={props.setShowcase} />
      </div>
    </div>
  )
}

export default Main