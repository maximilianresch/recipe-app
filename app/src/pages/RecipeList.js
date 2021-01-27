import { useState, useEffect } from "react";
import recipeApi from "../utils/recipeApi";
// import { Link } from "react-router-dom";
import useSWR from "swr";

import style from "./style.module.css";

import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Divider,
  Text,
  Link,
  Button,
  ButtonGroup,
  Spinner,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import { useRecoilState } from "recoil";
import { userState } from "../globalState";
import { useParams } from "react-router-dom";

const fetcher = (url) => recipeApi.get(url).then((res) => res.data);

export default function RecipeList() {
  const [user, setUser] = useRecoilState(userState);
  const [recipies, setRecipies] = useState([]);
  const [searchfield, setSearchfield] = useState(""); 
  
  const { data, error } = useSWR("/recipe", fetcher);

  let { id } = useParams();

  useEffect(async () => {
    const response = await recipeApi.get(`/recipe`);
    setRecipies(response.data.recipes);
  }, []);

  const onSearch = (e) => {
    setSearchfield(e.target.value)
    const filteredRecipes = [...recipies];
    const filteredNewRecipes = filteredRecipes.filter(recipe => {
      return recipe.title.toLowerCase().includes(searchfield.toLowerCase())
    })
    setRecipies(filteredNewRecipes);
  }
  

  const onDelete = async (id) => {
    const response = await recipeApi.delete(`/recipe/${id}`);

    const newRecipes = [...recipies];
    const index = recipies.findIndex((r) => r._id === id);
    newRecipes.splice(index, 1);
    setRecipies(newRecipes);
    console.log("id", id);
  };

  if (error) return <Text textAlign="center">You may need to login or register</Text>;
  if (!data)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "100px",
        }}
      >
        <Spinner />
      </div>
    );

  return (
    <div>
      <Box>
        <InputGroup>
          <Input
            type="search"
            placeholder="Search"
            onChange={onSearch}
          />
        </InputGroup>
      </Box>
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <h1>Recipes</h1>
      </div>
      <>
        {data.recipes.length === 0 && (
          <Box textAlign="center" pt="50px">
            sorry no recipes
          </Box>
        )}
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
        {/* {isLoading && <Spinner />}

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
        )}*/}
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
                <Button colorScheme="red" onClick={() => onDelete(recipe._id)}>
                  Delete
                </Button>
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
