import React, { useState, useEffect } from "react";
import style from "./style.module.css";

/*

const recipe = [
    
]

*/

const recipiesKey = "recipies";

export default function TestForm() {
  const [title, setTitle] = useState("");
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [guide, setGuide] = useState("");

  const [recipies, setRecipies] = useState(
    localStorage.getItem(recipiesKey)
      ? JSON.parse(localStorage.getItem(recipiesKey))
      : []
  );

  useEffect(() => {
    localStorage.setItem(recipiesKey, JSON.stringify(recipies));
  }, [recipies]);

  const onSubmit = () => {
    const newList = [...recipies];
    newList.push({ title, ingredients, guide });
    setRecipies(newList);
    setTitle("");
    setIngredients([]);
    setGuide("");
  };

  const onDelete = (index) => {
    const newList = [...recipies];
    newList.splice(index, 1);
    setRecipies(newList);
  };

  const onAdd = () => {
    const newList = [...ingredients];
    newList.push(currentIngredient);
    setCurrentIngredient("");
    setIngredients(newList);
  };

  return (
    <div>
      <form className={style.form}>
        <h1>Recipe</h1>
        <input
        className={style.title}
          value={title}
          placeholder="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <textarea
        className={style.guide}
          value={guide}
          placeholder="guide"
          onChange={(e) => {
            setGuide(e.target.value);
          }}
        ></textarea>
        <input
        className={style.ingredients}
          value={currentIngredient}
          placeholder="ingredients"
          onChange={(e) => {
            setCurrentIngredient(e.target.value);
          }}
        ></input>
        {ingredients.map((ingredient) => {
          return <p>{ingredient}</p>;
        })}
        <button type="button" onClick={onAdd}>
          add ingredients
        </button>
        <button type="button" onClick={onSubmit}>
          Submit
        </button>
      </form>

      <div className={style.list}>
        <ul>
          {recipies.map((recipe, i) => {
            return (
              <div key={recipe.title} style={{ marginTop: "1rem" }}>
                <li>
                  Title: {recipe.title}
                  <p>ingredients: {recipe.ingredients.join(", ")}</p>
                  <p>guide: {recipe.guide}</p>
                </li>
                <button type="button" onClick={onDelete}>
                  Löschen
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
