import recipeApi from "../utils/recipeApi";

import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import { userState } from '../globalState';

export default function Profile({ user }) {
  const setUser = useSetRecoilState(userState)
  const [firstname, setNewFirstname] = useState(user?.firstname);
  const [lastname, setNewLastname] = useState(user?.lastname);
  const [email, setNewEmail] = useState(user?.email);

  const onButton = async () => {
    const newUser = {
      firstname,
      lastname,
      email,
    }
    const response = await recipeApi.put("/profile", newUser);
    setUser(newUser)
  };

  return (
    <div>
      <div>
        <h1>Profile</h1>
        <div>
          {user && (
            <form action="/profile">
              <Box
                display="flex"
                flexDirection="row"
                gridGap="5px"
                justifyContent="center"
              >
                <TextField
                  id="filled-basic"
                  label="firstname"
                  variant="filled"
                  value={firstname}
                  onChange={(e) => {
                    setNewFirstname(e.target.value);
                  }}
                />

                <TextField
                  id="filled-basic"
                  label="lastname"
                  variant="filled"
                  value={lastname}
                  onChange={(e) => {
                    setNewLastname(e.target.value);
                  }}
                />
                <TextField
                  id="filled-basic"
                  label="email"
                  variant="filled"
                  value={email}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                />
              </Box>
              <button type="button" onClick={onButton}>
                change
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
