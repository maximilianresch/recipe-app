import recipeApi from "../utils/recipeApi";

import React, { useEffect } from "react";
import { userState } from "../../src/globalState";
import { useRecoilState } from "recoil";

import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";

export default function Profile() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    recipeApi.get("/me").then((res) => {
      console.log("data", res);
      setUser(res.data.user);
    });
  }, [setUser]);

 

  return (
    <div>
      <div>
      <h1>Profile</h1>
        <div>
          {user && (
            <form action="/profile">
              <Box display="flex" flexDirection="row" gridGap="5px" justifyContent="center">
                <TextField
                  id="filled-basic"
                  label="firstname"
                  variant="filled"
                  defaultValue={user.firstname}
                />

                <TextField
                  id="filled-basic"
                  label="lastname"
                  variant="filled"
                  defaultValue={user.lastname}
                />
                <TextField
                  id="filled-basic"
                  label="lastname"
                  variant="filled"
                  defaultValue={user.email}
                />
              </Box>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
