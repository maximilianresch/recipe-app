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

export default function RecipeList() {
  const [recipies, setRecipies] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  useEffect(async () => {
    const response = await recipeApi.get(`/recipe`);
    setRecipies(response.data.recipes);
  }, []);

  return (
    <div>
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
            <h1>{recipe.title}</h1>
            <Table key={i} variant="simple" bg="#D9896C" color="whitesmoke">
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
              <h2>Guide: </h2>
              <p>{recipe.guide}</p>
              <ButtonGroup style={{paddingTop: "10px", paddingBottom: "10px"}} variant="outline" spacing="8">
                <Button colorScheme="blue">
                  <Link href={`/recipes/${recipe._id}/edit`}>Edit</Link>
                </Button>
                <Button colorScheme="red">Delete</Button>
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
