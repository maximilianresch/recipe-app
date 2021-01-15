import { useState, useEffect } from "react";
import recipeApi from "../utils/recipeApi";
// import { Link } from "react-router-dom";

import style from "./style.module.css";

import {
  Table,
  Tbody,
  Tr,
  Td,
  Divider,
  Text,
  Link,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { userState } from "../globalState";
import { useParams } from "react-router-dom";

export default function RecipeList() {
  const [recipies, setRecipies] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  let { id } = useParams();

  useEffect(async () => {
    const response = await recipeApi.get(`/recipe`);
    setRecipies(response.data.recipes);
  }, []);

  const onDelete = async (id) => {

    
    const response = await recipeApi.delete(`/recipe/${id}`);

    const newRecipes = [...recipies]
    const index = recipies.findIndex(r => r._id === id)
    newRecipes.splice(index, 1)
    setRecipies(newRecipes)
    console.log("id", id);
  };

  return (
    <div>
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <h1>Recipes</h1>
      </div>
      <>
        {!user && (
          <Text
            style={{
              paddingTop: "100px",
              textAlign: "center",
            }}
          >
            {" "}
            {":("}
            <br />
            You have to create an account{" "}
            <Link color="teal.500" href={"/register"}>
              here
            </Link>{" "}
            or if you have already one click
            <Link color="teal.500" href={"/login"}>
              {" "}
              here
            </Link>
          </Text>
        )}
      </>

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
              <ButtonGroup
                style={{ paddingTop: "10px", paddingBottom: "10px" }}
                variant="outline"
                spacing="8"
              >
                <Button colorScheme="blue">
                  <Link href={`/recipes/${recipe._id}/edit`}>Edit</Link>
                </Button>
                <Button
              
                  colorScheme="red"
                  onClick={() => onDelete(recipe._id)}
                >Delete</Button>
              </ButtonGroup>

              <br />
            </div>
            <Divider />
          </div>
        );
      })}
    </div>
  );
}
