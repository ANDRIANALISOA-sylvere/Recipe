/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import './App.css'
function App() {
  // eslint-disable-next-line no-unused-vars
  const [initialRecipe,setInitialRecipe]=useState(null);
  const [searchRecipes, setSearchRecipes] = useState([]);
  const [input, setInput] = useState("");


  useEffect(()=>{
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((data) => setInitialRecipe(data.meals[0]))
      .catch((error) => console.error("Error fetching recipe:", error));

  },[]);

  useEffect(() =>{
    if (input !== "") {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
      .then((response) => response.json())
      .then(data=> {
        setSearchRecipes(data.meals);
        setInitialRecipe(null);
      })
      .catch(err=> console.error(err))
    }
  },[input])

  function handleChange(e)
  {
    setInput(e.target.value);
  }
  return (
    <div>
      <div className="m-5">
            <div className="flex justify-center">
                <input className="w-72 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 mb-2 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Chercher une recette" placeholder="Chercher une recette..." value={input} onChange={(e)=> handleChange(e)}></input>
            </div>
        <div className="grid grid-cols-3 w-100 gap-2">
            {initialRecipe && (
              <div className="flex justify-center">
                <div className="w-72 shadow mt-5 bg-slate-50">
                  <img src={initialRecipe.strMealThumb} alt={initialRecipe.strMeal} />
                  <h1 className="font-bold text-center text-xl pb-3 mt-2">{initialRecipe.strMeal}</h1>
                </div>
              </div>
            )}
                {searchRecipes ? (
                    searchRecipes.map((recipe) => (
                      <div key={recipe.idMeal} className="w-56 shadow mt-5 bg-slate-50">
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                        <h1 className="font-bold text-center text-xl pb-3 mt-2">{recipe.strMeal}</h1>
                        </div>
    ))          ) : (
                <p>Loading...</p>
              )}
            
        </div>
        
    </div>
    </div>
  )
}

export default App
