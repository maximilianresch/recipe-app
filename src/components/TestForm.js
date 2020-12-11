import React, { useState, useEffect } from "react";
import style from "./style.module.css";

import * as yup from "yup";

/*
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

      */

let schema = yup.object().shape({
  title: yup.string().required(),
  guide: yup.string().required(),
  ingredients: yup
    .array(
      yup.object().shape({
        name: yup.string().required(),
        amount: yup.string().required(),
      })
    )
    .min(1),
});

const recipiesKey = "recipies";

export default function TestForm() {
  const [title, setTitle] = useState("");
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [guide, setGuide] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [recipies, setRecipies] = useState(
    localStorage.getItem(recipiesKey)
      ? JSON.parse(localStorage.getItem(recipiesKey))
      : []
  );

  useEffect(() => {
    localStorage.setItem(recipiesKey, JSON.stringify(recipies));
  }, [recipies]);

  const onSubmit = async () => {
    const newRecipie = { title, ingredients, guide };

    const valid = await schema.validate(newRecipie).catch((e) => {
      const errorMessage = e.errors[0]
      setErrorMessage(errorMessage);

      console.log('error', errorMessage)
    });

    if (!valid) {
      return;

    }

    console.log("valid", valid);

    const newList = [...recipies];
    newList.push(newRecipie);
    setRecipies(newList);
    setTitle("");
    setIngredients([]);
    setGuide("");
    setErrorMessage("");
  };

  const onDelete = (index) => {
    const newList = [...recipies];
    newList.splice(index, 1);
    setRecipies(newList);
  };

  const onAdd = () => {
    const newIngredient = { name: currentIngredient, amount }
    const newList = [...ingredients];
    newList.push(newIngredient);
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
        {ingredients.map((ingredient, i) => {
          return (
            <p key={i}>
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
      <div style={{color: 'red'}}>
        {errorMessage}
      </div>

      <div className={style.list}>
        <ul>
          {recipies.map((recipe, i) => {
            return (
              <div key={i} style={{ marginTop: "1rem" }}>
                <li>
                  Title: {recipe.title}
                  {recipe.ingredients.map((ingredient, i) => {
                    return (
                      <div key={i}>
                        <p>amount: {ingredient.amount}</p>
                        <p>ingredients: {ingredient.name}</p>
                      </div>
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
