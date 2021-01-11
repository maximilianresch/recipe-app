import {useState, useEffect} from 'react';
import recipeApi from '../utils/recipeApi';
import { Link } from 'react-router-dom'

export default function RecipeList() {

    const [recipies, setRecipies] = useState([]);

  useEffect(async () => {
    const response = await recipeApi.get("/recipe")
    setRecipies(response.data.recipes)
    
    console.log("res", response);
  }, []);

    return (
        <div>
        <ul>
          {recipies.map((recipe, i) => {
            console.log('recipe', recipe)
            return (
              <div key={i} style={{ marginTop: "1rem" }}>
                <li>
                  <h4> Title:</h4> {recipe.title}
                  <h4>ingredients:</h4>
                  {recipe.ingredients.map((ingredient, i) => {
                    return (
                      <div key={i}>
                        <p>
                          {ingredient.amount} {ingredient.measure}{" "}
                          {ingredient.name}
                        </p>
                      </div>
                    );
                  })}
                  <h4>guide:</h4>
                  {recipe.guide}
                </li>
                <br />
                <Link to={`/recipes/${recipe._id}/edit`}>edit</Link>
              </div>
              
            );
          })}
        </ul>
      </div>
    )
}