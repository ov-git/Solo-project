import Image from 'next/image'

function Drink({ drink, setShowcase }) {

    function truncate(name) {
        return name.length > 30 ? name.slice(0, 20) + '...' : name;        
    }

    return (
        <div className=" h-auto w-full p-3">
            <div className=" h-full max-h-[400px] w-full rounded bg-black bg-opacity-60 hover:bg-opacity-90 group">
                <button onClick={() => setShowcase(drink)}>
                    <Image src={drink.drinkThumb} alt={drink.drinkName} height={400} width={400} className='cursor-pointer rounded group-hover:opacity-70'/>
                <p className=' text-white text-xl'>{truncate(drink.drinkName)}</p>
                </button>
            </div>
        </div>


    )
}

export default Drink