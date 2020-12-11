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
  const [amount, setAmount] = useState("");

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
    newList.push({ name: currentIngredient, amount });
    setIngredients(newList);

    setCurrentIngredient("");
    setAmount("");
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
        <input
          value={amount}
          placeholder="amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        ></input>
        {ingredients.map((ingredient) => {
          return (
            <p>
              {" "}
               {ingredient.amount} {ingredient.name}
            </p>
          );
        })}
        <button type="button" onClick={onAdd}>
          add ingredients and amount
        </button>
        <button type="button" onClick={onSubmit}>
          Submit
        </button>
      </form>

      {/*
  const recipe = [
          {
            title: "Gulasch",
            guide: "geh vorher scheißn (nicht hände waschen!!!)",
            ingridients: [
              {
                name: "Knoblauch",
                amount: "234"
              }
            ]
          }
        ]

      */}
      <div className={style.list}>
        <ul>
          {recipies.map((recipe, i) => {
            return (
              <div key={recipe.title} style={{ marginTop: "1rem" }}>
                <li>
                  Title: {recipe.title}
                  {recipe.ingredients.map((ingredient) => {
                    return (
                      <>
                        <p>amount: {ingredient.amount}</p>
                        <p>ingredients: {ingredient.name}</p>
                      </>
                    );
                  })}
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
