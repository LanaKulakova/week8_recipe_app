import {useEffect, useState} from "react";
import video from "./food.mp4";
import './App.css';
import MyRecipesComponents from "./MyRecipeComponent";

  // https://api.edamam.com/api/recipes/v2?type=public&q=avocado&app_id=57611161&app_key=%20b600588033414b312758ee79cc3ec0b0%09


function App() {
//const MY_ID = "57611161";
//const MY_KEY = "%20b600588033414b312758ee79cc3ec0b0%09"

// вызов API

const [mySearch, setMySearch] = useState('');
const [myRecipes, setMyRecipes] = useState([]);
const [wordSubmitted, setWordSubmitted] = useState("avocado");

useEffect (() => {
  const getRecipe = async () => {
    const response = await fetch("https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=57611161&app_key=%20b600588033414b312758ee79cc3ec0b0%09");
    const data = await response.json();
    setMyRecipes(data.hits);
  }
  getRecipe()
}, [wordSubmitted])

const myRecipeSearch = (e) => {
setMySearch(e.target.value);
}

const finalSearch = (e) => {
  e.preventDefault()
  setWordSubmitted(mySearch)
}

  return (
    <div className="App">
      <div className="container">
        <video autoPlay muted loop>
<source src= {video} type="video/mp4" />
        </video>
<h1>Find a recipe</h1>
      </div>

      <div className='container'>
     <form onSubmit={finalSearch}>
         <input className="search" placeholder="Search ..." onChange={myRecipeSearch} value={mySearch} >
          </input>
    </form>
</div>

<div className='container'>
     <button>
         <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt="icon"/>
      </button>
</div>

{myRecipes.map((element, index) => (
  <MyRecipesComponents key={index}
   label={element.recipe.label}
   image={element.recipe.image}
    calories={element.recipe.calories}
     ingredients={element.recipe.ingredientLines} />
))}



    </div>
  );
}

export default App;
