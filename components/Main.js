
import { useEffect, useState } from 'react'
import { getCategory } from '../lib/ApiService';
import Drinks from './Drinks'
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'
import categories from '../lib/Categories';

function Main(props) {

  const [category, setCategory] = useState('');
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    getByCategory();
  }, [category])

  useEffect(() => {
    handleSearch();

  }, [search])
  
  const handleSearch = () => {

    // let saved = drinks;

    let filtered = drinks.filter((drink) => {
      return drink.drinkName.includes(search);
    })
    setDrinks(filtered);
  }

  const getByCategory = async () => {
    if (category) {
      const data = await getCategory(category);
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
    <div className=' h-full w-full flex-col'>
      <div className="py-4 mx-1 gap-2 pl-0 h-36 overflow-x-scroll max-w-screen flex justify-between text-white scroll-smooth">

        {/* Categories */}
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

      {/* Search */}
      <form className='flex flex-col p-8 bg-red-300 w-[50vw] lg:w-[40vw] xl:w-[30vw]'>
        <label>Search from {category} </label>
        <input value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder='Search drinks'></input>
      </form>

      <div className=' m-0 p-0'>
        <Drinks drinks={drinks} setShowcase={props.setShowcase} />
      </div>
    </div>
  )
}

export default Main