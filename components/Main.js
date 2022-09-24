
import { useEffect, useState } from 'react'
import { getCategory } from '../lib/ApiService';
import Drinks from './Drinks'
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'
import categories from '../lib/Categories';

function Main(props) {

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

  const slideRight = (e) => {
    let slider = e.target.parentElement;

    slider.scrollLeft += window.innerWidth;

    // if ((slider.scrollLeft + window.innerWidth + 50) < slider.scrollWidth) {
    // } else {
    //   slider.scrollLeft = 0;
    // }
  }

  const slideLeft = (e) => {
    let slider = e.target.parentElement;

    slider.scrollLeft -= window.innerWidth;

    // if ((slider.scrollLeft - window.innerWidth) >= 0) {
    // } else {
    //   slider.scrollLeft = slider.scrollWidth - 1;
    // }

  }

  return (
    <div className=' h-full w-full flex-col'>
      <div className="py-4 mx-1 gap-2 pl-0 h-36 overflow-x-scroll max-w-screen flex justify-between text-white scroll-smooth">
        <BiLeftArrow className='z-10 cursor-pointer text-black text-[50px] absolute rounded-lg left-0 bg-black px-2 h-28 w-10 hover:bg-opacity-70 hover:text-white bg-opacity-10' onClick={slideLeft}></BiLeftArrow>
        {categories.map((cat) => (
          <div className=' rounded border cursor-pointer border-black h-full shrink-0 grow w-[24vw] my-0 inline-block bg-cover bg-center overflow-hidden'
            key={cat.name} onClick={() => setCategory(cat.name)} style={{ backgroundImage: `url(${cat.image.src})` }}>

            <div className='h-full shrink-0 grow w-full bg-black bg-opacity-0 hover:bg-opacity-50'>
              <p className='z-10'> {cat.name} </p>
            </div>

          </div>
        ))}
        <BiRightArrow className='z-10 cursor-pointer text-black text-[50px] absolute rounded-lg right-0 bg-black px-2 h-28 w-10 hover:bg-opacity-70 hover:text-white bg-opacity-10' onClick={slideRight}></BiRightArrow>
      </div>

      <div className=' m-0 p-0'>
        <Drinks drinks={drinks} setShowcase={props.setShowcase} />
      </div>
    </div>
  )
}

export default Main