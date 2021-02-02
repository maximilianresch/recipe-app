import React, { useState, useEffect } from "react";
import style from "./style.module.css";

import { useRecoilState } from "recoil";
import { userState } from "../globalState";
import * as yup from "yup";

import recipeApi from "../utils/recipeApi";

import {
  Input,
  Textarea,
  Select,
  Button,
  Stack,
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Link,
} from "@chakra-ui/react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

/*
  const recipe = [
          {
            title: "Gulasch",
            guide: "geh vorher aufs klo (nicht hände waschen!!!)",
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [recipies, setRecipies] = useState([]);

  const [user] = useRecoilState(userState);

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
    onOpen();
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
      {!user && (
        <Box p="30px" textAlign="center">
          There is no user logged in or registered. But you can still use the
          recipe editor. Keep in mind, that your recipes won't be safed.
        </Box>
      )}
      <>
        {" "}
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>YUHUU!</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Your recipe has been successfully added. You can view it in{" "}
              <Link color="teal.500" href="/recipes">
                Recipes
              </Link>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialog>
      </>
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
              <option value={"l"}>l</option>
              <option value={"Stk"}>Stk</option>
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
          <Button
            variant="outline"
            onClick={onAdd}
            color="#265C9E"
            borderColor="#265C9E"
            border="solid 2px #265C9E"
          >
            Add ingredients and amount
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              onSubmit();
            }}
            color="#265C9E"
            borderColor="#265C9E"
            border="solid 2px #265C9E"
          >
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
      <>
        {recipies.map((recipe, i) => {
          return (
            <div className={style.recipeList}>
              <h2>{recipe.title}</h2>
              <Table key={i} variant="simple" bg="#5F96D9" color="whitesmoke">
                {recipe.ingredients.map((ingredient, i) => {
                  return (
                    <Tbody className={style.tbody} key={i}>
                      <Tr className={style.tr}>
                        <Td>
                          {ingredient.amount} {ingredient.measure}{" "}
                          {ingredient.name}
                        </Td>
                      </Tr>
                    </Tbody>
                  );
                })}
              </Table>
              <div>
                <h3>Guide: </h3>
                <p>{recipe.guide}</p>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
}
