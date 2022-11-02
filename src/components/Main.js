import { useEffect, useState, useRef } from 'react'
import Image from 'next/image';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'
import { getAll, getCategory } from '../../lib/ApiService';
import categories from '../../lib/Categories';
import Drinks from './Drinks'

function Main(props) {

  const [category, setCategory] = useState('Cocktails');
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState('');

  const searchRef = useRef();

  useEffect(() => {
    const getByCategory = async () => {
      if (category) {
        const data = (category == "All Drinks") ? await getAll() : await getCategory(category);
        setDrinks(data);
      }
    }
    getByCategory();
  }, [category])

  useEffect(() => {
    handleSearch();
  }, [search])

  const handleSearch = () => {
    let filtered = drinks.filter((drink) => {
      return drink.drinkName.toLowerCase().includes(search.toLowerCase());
    })
    return filtered;
  }


  const slideRight = (e) => {
    let slider = e.target.parentElement;
    slider.scrollLeft += window.innerWidth;

  }

  const slideLeft = (e) => {
    let slider = e.target.parentElement;
    slider.scrollLeft -= window.innerWidth;
  }

  return (

    <div className=' h-full w-full flex-col text-white'>
      <h1 className='p-2 px-4 text-4xl'>Categories</h1>
      <div id='carousel' className="py-4 mx-2 gap-3 pl-0 h-36 overflow-x-scroll max-w-screen flex justify-between text-white scroll-smooth">

        {/* Categories */}
        <BiLeftArrow className='z-10 cursor-pointer text-black text-[50px] absolute rounded-lg left-0 bg-black px-2 h-28 w-10 hover:bg-opacity-70 hover:text-white bg-opacity-10'
          onClick={slideLeft}></BiLeftArrow>
        {categories.map((cat) => (
          <div className=' text-2xl rounded relative border cursor-pointer border-black h-full shrink-0 grow w-[45vw] md:w-[32vw] lg:w-[24vw] my-0 inline-block bg-cover'
            key={cat.name} onClick={() => setCategory(cat.name)}>
            <Image className='bg-black rounded opacity-90 hover:opacity-70' src={cat.image.src} objectFit={'cover'} layout={'fill'} alt={cat.name} priority />
            <div className='h-full shrink-0 grow w-full bg-black z-10'>
              <p className='absolute z-10 px-6'> {cat.name} </p>
            </div>
          </div>
          
        ))}
        <BiRightArrow className='z-10 cursor-pointer text-black text-[50px] absolute rounded-lg right-0 bg-black px-2 h-28 w-10 hover:bg-opacity-70 hover:text-white bg-opacity-10'
          onClick={slideRight}></BiRightArrow>
      </div>

      {/* Search */}
      <div id="search" ref={searchRef}>
        <form className='flex flex-col p-4 md:p-8 w-full sm:w-[60vw] lg:w-[40vw] xl:w-[35vw]'>
          <label className='text-2xl'>Search from: </label>
          <span className='text-2xl py-1 w-full text-yellow-200'> {category}</span>
          <input value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder='Search drinks...'
            className='mt-2 text-xl p-3 py-1 rounded text-black'></input>
        </form>
      </div>

      <div className='min-h-[75vh] flex justify-center 2xl:px-12'>
        <Drinks drinks={handleSearch(drinks)} setShowcase={props.setShowcase} />
      </div>
    </div>
  )
}

export default Main