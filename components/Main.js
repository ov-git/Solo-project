import { useEffect, useState, useRef } from 'react'
import { getAll, getCategory } from '../lib/ApiService';
import Drinks from './Drinks'
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'
import categories from '../lib/Categories';
import Image from 'next/image';

function Main(props) {

  const [category, setCategory] = useState('Cocktails');
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState('');

  const searchRef = useRef();

  useEffect(() => {
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

  const getByCategory = async () => {
    if (category) {
      const data = (category == "All Drinks") ? await getAll() : await getCategory(category);
      setDrinks(data);
    }
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
      <h1 className='p-4 text-4xl'>Categories</h1>
      <div id='carousel' className="py-4 mx-2 gap-3 pl-0 h-36 overflow-x-scroll max-w-screen flex justify-between text-white scroll-smooth">

        {/* Categories */}
        <BiLeftArrow className='z-10 cursor-pointer text-black text-[50px] absolute rounded-lg left-0 bg-black px-2 h-28 w-10 hover:bg-opacity-70 hover:text-white bg-opacity-10'
          onClick={slideLeft}></BiLeftArrow>
        {categories.map((cat) => (
          <div className=' rounded relative border cursor-pointer border-black h-full shrink-0 grow w-[48vw] md:w-[36vw] lg:w-[24vw] my-0 inline-block bg-cover'
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
        <form className='flex flex-col p-8 w-full sm:w-[60vw] xl:w-[45vw] 2xl:w-[35vw]'>
          <label className='text-3xl'>Search from: <span className='text-4xl p-1 w-full text-yellow-200'> {category}</span> </label>
          <input value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder='Search drinks...'
            className='mt-2 text-[1.5rem] p-3 py-1 rounded text-black'></input>
        </form>
      </div>

      <div className='min-h-[75vh] flex justify-center'>
        <Drinks drinks={handleSearch(drinks)} setShowcase={props.setShowcase} />
      </div>
    </div>
  )
}

export default Main