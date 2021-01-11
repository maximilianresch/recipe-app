import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import style from "./style.module.css";

import TextField from "@material-ui/core/TextField";
import * as yup from "yup";

import { Select, MenuItem, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import recipeApi from "../utils/recipeApi";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginLeft: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/*
  const recipe = [
          {
            title: "Gulasch",
            guide: "geh vorher scheißn (nicht hände waschen!!!)",
            portions: "2"
            ingridients: [
              {
                name: "Knoblauch",
                amount: "234",
                measure: "kg"
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
      })
    )
    .min(1),
});

export default function RecipeEdit() {

  let { id } = useParams();

  useEffect( async () => {
    console.log('recipeId', id)

    const response = await recipeApi.get(`/recipe/${id}` )

    const body = response.data

    const { recipie } = body
    
  
    setTitle(recipie.title)
    setIngredients(recipie.ingredients)
    setGuide(recipie.guide)
    setAmount(recipie.amount)
    setMeasure(recipie.measure)

  }, [id])


  
  const [title, setTitle] = useState("");
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [guide, setGuide] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [measure, setMeasure] = useState("");

  const classes = useStyles();

  const [recipies, setRecipies] = useState([]);

  const onSubmit = async () => {
    const newRecipie = { title, ingredients, guide };

    const valid = await schema.validate(newRecipie).catch((e) => {
      const errorMessage = e.errors[0];
      setErrorMessage(errorMessage);

      console.log("error", errorMessage);
    });

    if (!valid) {
      return;
    }

    console.log("valid", valid);

    const newList = [...recipies];
    newList.push(newRecipie);
    setRecipies(newList);

    const response = await recipeApi.put(`/recipe/${id}`, newRecipie);
  };

  const onDelete = (index) => {
    const newList = [...recipies];
    newList.splice(index, 1);
    setRecipies(newList);
  };

  const onAdd = async () => {
    const newIngredient = { name: currentIngredient, amount, measure };
    const newList = [...ingredients];
    newList.push(newIngredient);
    setIngredients(newList);
  };

  return (
    <div>
      <form className={style.form}>
        <h1>Recipe</h1>
        <TextField
          variant="outlined"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          label="title"
        ></TextField>
        <TextField
          multiline
          rows={10}
          variant="outlined"
          value={guide}
          label="guide"
          onChange={(e) => {
            setGuide(e.target.value);
          }}
        ></TextField>
        <TextField
          variant="outlined"
          value={currentIngredient}
          label="ingredients"
          onChange={(e) => {
            setCurrentIngredient(e.target.value);
          }}
        ></TextField>
        <Box display="flex" flexDirection="row" gap="10px">
          <TextField
            variant="outlined"
            value={amount}
            label="amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          ></TextField>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              measure
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="measure"
              onChange={(e) => {
                setMeasure(e.target.value);
              }}
              value={measure}
            >
              <MenuItem value={""}>none</MenuItem>
              <MenuItem value={"g"}>g</MenuItem>
              <MenuItem value={"kg"}>kg</MenuItem>
              <MenuItem value={"ml"}>ml</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {ingredients.map((ingredient, i) => {
          return (
            <p key={i}>
              {" "}
              {ingredient.amount} {ingredient.measure} {ingredient.name}
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
      <div
        style={{
          color: "red",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {errorMessage}
      </div>
      
    </div>
  );
}
