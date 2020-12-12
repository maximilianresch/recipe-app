import React from "react";
import style from "./style.module.css";

import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import { useState } from "react";


let schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
})

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async ()  => {
      const newRegister = {firstname, lastname, email, password}

      const valid = await schema.validate(newRegister).catch((e) => {
        const errorMessage = e.errors;
        setErrorMessage(errorMessage);
  
        console.log("error", errorMessage);
      });

      if (!valid) {
          return 
      }

    console.log("Register", {
      firstname,
      lastname,
      email,
      password,
    });

    setErrorMessage("");

  };

  return (
    <div>
      <form className={style.form}>
        <h1>Register</h1>
        <TextField
          variant="outlined"
          label="firstname"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        ></TextField>
        <TextField
          variant="outlined"
          label="lastname"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        ></TextField>
        <TextField
          variant="outlined"
          label="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></TextField>
        <TextField
          variant="outlined"
          label="password"
          type="password"
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
