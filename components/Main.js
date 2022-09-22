
import { useEffect, useState } from 'react'
import { getCategory } from '../lib/ApiService';
import Drinks from './Drinks'

import Image from 'next/image';
import cocktail from '../public/cocktail.jpg'

function Main(props) {

  const categories = ["Cocktails", "Shots", "Beer", "Ordinary Drinks", "more"];


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

      <div className="p-4 h-36 overflow-x-scroll maw-w-[90vw] flex justify-between text-white">
        {categories.map((cat) => (
          <div className='border cursor-pointer border-black h-full shrink-0 grow w-[10vw] min-w-[20rem] m-2 my-0 inline-block bg-cover bg-center overflow-hidden'
            key={cat} onClick={() => setCategory(cat)} style={{ backgroundImage: `url(${cocktail.src})` }}>


            <div className='h-full shrink-0 grow w-full bg-black bg-opacity-0 hover:bg-opacity-50'> <p className='z-10'>
              {cat}
            </p> </div>

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