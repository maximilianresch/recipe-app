import React, { useState, useEffect } from "react";
import style from "./style.module.css";

import * as yup from "yup";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import recipeApi from "../utils/recipeApi";

import {
  Input,
  Textarea,
  Select,
  Button,
  ButtonGroup,
  Stack,
} from "@chakra-ui/react";

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

export default function RecipeForm() {
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
    setTitle("");
    setIngredients([]);
    setGuide("");
    setErrorMessage("");

    const response = await recipeApi.post("/recipe", newRecipie);
  };

  const onAdd = async () => {
    const newIngredient = { name: currentIngredient, amount, measure };
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
        <div>
          <Input
            variant="filled"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="title"
          ></Input>
        </div>
        <div>
          <Textarea
            multiline
            rows={10}
            variant="filled"
            value={guide}
            placeholder="guide"
            onChange={(e) => {
              setGuide(e.target.value);
            }}
          ></Textarea>
        </div>
        <div>
          <Input
            variant="filled"
            value={currentIngredient}
            placeholder="ingredients"
            onChange={(e) => {
              setCurrentIngredient(e.target.value);
            }}
          ></Input>
        </div>
        <Box display="flex" flexDirection="row" gap="10px">
          <Input
            variant="filled"
            value={amount}
            placeholder="amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          ></Input>
          <Box style={{ paddingLeft: "4px", width: "100%" }}>
            <Select
              variant="filled"
              placeholder="measure"
              onChange={(e) => {
                setMeasure(e.target.value);
              }}
            >
              <option value=""></option>
              <option value={"g"}>g</option>
              <option value={"kg"}>kg</option>
              <option value={"ml"}>ml</option>
            </Select>
          </Box>
        </Box>
        {ingredients.map((ingredient, i) => {
          return (
            <p key={i}>
              {" "}
              {ingredient.amount} {ingredient.measure} {ingredient.name}
            </p>
          );
        })}
        <Stack direction="column" spacing={4}>
          <Button variant="outline" onClick={onAdd} colorScheme="green">
            Add ingredients and amount
          </Button>
          <Button variant="outline" onClick={onSubmit} colorScheme="green">
            Submit
          </Button>
        </Stack>
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

      <div className={style.list}>
        <ul>
          {recipies.map((recipe, i) => {
            return (
              <div key={i} style={{ marginTop: "1rem" }}>
                <h2>Preview</h2>
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
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
