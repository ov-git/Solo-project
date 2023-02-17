import React from 'react'
import { useState, useContext } from 'react'
import { addDrinkToLibrary } from '../../lib/ApiService'
import AuthContext from '../contexts/AuthContext'

function CreateDrink() {

    const { session } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [measures, setMeasures] = useState([])
    const [image, setImage] = useState('http://www.thecocktaildb.com/images/media/drink/ruxuvp1472669600.jpg')

    const [newIngredient, setNewIngredient] = useState('')
    const [newMeasure, setNewMeasure] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const drink = {
            alcohol: "true",
            drinkCategory: "Cocktails",
            userEmail: session.email,
            drinkName: name,
            drinkInstructions: desc,
            drinkThumb: image,
            drinkIngredients: ingredients,
            drinkMeasures: measures,
        }

        addDrinkToLibrary(drink);
    }

    const handleIngredients = (e) => {
        e.preventDefault()
        setIngredients([...ingredients, newIngredient])
        setMeasures([...measures, newMeasure])
        setNewIngredient('')
        setNewMeasure('')
    }

    const changeImage = (e) => {
        e.preventDefault()
        const image = URL.createObjectURL(e.target.files[0]);
        console.log(image)
    }

    return (
        <div className='w-full h-72 grid grid-cols-3 bg-red-200'>
            <form>
                <h1>Create Drink</h1>
                <input
                    type={'file'}
                    accept='.jpg, jpeg, .png, .gif'
                    onChange={changeImage}>
                
                </input>

            </form>
            <form className='flex flex-col gap-3 text-black' onSubmit={(e) => handleSubmit(e)}>
                <label>Drink Name</label>
                <input onChange={(e) => setName(e.target.value)} value={name} />
                <label>Description</label>
                <textarea onChange={(e) =>
                    setDesc(e.target.value)}></textarea>
                <button type='submit'>Submit</button>
            </form>
            <form className='bg-green-200 flex flex-col justify-center items-start text-black' onSubmit={(e) => handleIngredients(e)}>
                <input placeholder={"name here"} value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)}></input>
                <input placeholder={"measures"} value={newMeasure} onChange={(e) => setNewMeasure(e.target.value)}></input>
                <button type='submit'> Add ingredients </button>
            </form>

        </div>
    )
}

export default CreateDrink