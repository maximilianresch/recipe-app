import React from "react";
import style from "./style.module.css";

import axios from "axios";
import * as auth from "../utils/auth";

import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import { useState } from "react";
import { useHistory} from 'react-router-dom';
import { Box } from "@material-ui/core";


let schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useHistory();

  const onSubmit = async () => {
    const newRegister = { firstname, lastname, email, password };

    const valid = await schema.validate(newRegister).catch((e) => {
      const errorMessage = e.errors;
      setErrorMessage(errorMessage);

      console.log("error", errorMessage);
    });

    if (!valid) {
      return;
    }

    console.log("Register", {
      firstname,
      lastname,
      email,
      password,
    });
    setErrorMessage("");

    const data = {
      firstname,
      lastname,
      email,
      password,
    };

   
    const response = await axios.post(
      "http://localhost:4000/register",
      data
    );

    if (response.data.success) {
      auth.getUserToken(response.data.token);
      router.push('/me')
    } else {
      setErrorMessage("E-mail is already in use")
    }

    console.log("response", response);
    window.location.reload(false);

  };

  const handleKeypress = (e) => {
    if (e.which === 13) {
      onSubmit();
    }
  };



  return (
    <div>
      <form className={style.form} action="/register" method="POST">
        <h1>Register</h1>
        <Box display="flex" flexDirection="row" gridGap="5px">
          <TextField
            variant="outlined"
            label="firstname"
            onKeyPress={handleKeypress}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          ></TextField>
          <TextField
            variant="outlined"
            label="lastname"
            onKeyPress={handleKeypress}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          ></TextField>
        </Box>
        <Box mt="3">
          <TextField
            variant="outlined"
            label="email"
            type="email"
            onKeyPress={handleKeypress}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></TextField>
        </Box>
        <TextField
          variant="outlined"
          label="password"
          type="password"
          onKeyPress={handleKeypress}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></TextField>

        <div style={{ color: "red" }}>{errorMessage}</div>
        <button type="button" onClick={onSubmit}>
          Register
        </button>
      </form>
    </div>
  );
}
