import recipeApi from "../utils/recipeApi";

import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

import { Box } from "@material-ui/core";
import { userState } from "../globalState";
import { Input } from '@chakra-ui/react';
import style from './style.module.css';
import {Button} from '@chakra-ui/react'

export default function Profile({ user }) {
  const setUser = useSetRecoilState(userState);
  const [firstname, setNewFirstname] = useState(user?.firstname);
  const [lastname, setNewLastname] = useState(user?.lastname);
  const [email, setNewEmail] = useState(user?.email);

  const onButton = async () => {
    const newUser = {
      firstname,
      lastname,
      email,
    };
    const response = await recipeApi.put("/profile", newUser);
    setUser(newUser);
    console.log("response", response);
  };

  return (
      <div className={style.form}>
        <h1>Profile</h1>
          {user && (
            <form  action="/profile">
              <Box
                display="flex"
                flexDirection="column"
                gridGap="5px"
                justifyContent="center"
              >
                <Input
                  id="filled-basic"
                  placeholder="firstname"
                  variant="filled"
                  value={firstname}
                  onChange={(e) => {
                    setNewFirstname(e.target.value);
                  }}
                />

                <Input
                  id="filled-basic"
                  placeholder="lastname"
                  variant="filled"
                  value={lastname}
                  onChange={(e) => {
                    setNewLastname(e.target.value);
                  }}
                />
                <Input
                  id="filled-basic"
                  placeholder="email"
                  variant="filled"
                  value={email}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                />
              </Box>
              <div style={{paddingTop: "20px", width:"50%", margin:"auto"}}>
              <Button colorScheme="blue" variant="outline" onClick={onButton}>
                change
              </Button>
              </div>
            </form>
          )}
      </div>
  );
}
