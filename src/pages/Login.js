import React, { useState } from "react";
import style from "./style.module.css";

import TextField from "@material-ui/core/TextField";
import * as yup from "yup";


let schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async () => {
      const newLogin = {email, password}

      const valid = await schema.validate(newLogin).catch((e) => {
          const errorMessage = e.errors;
          setErrorMessage(errorMessage)
          
      })

      if(!valid) {
          return
      }



    console.log("Register", {
      email,
      password,
    });

    
    setErrorMessage("");

  };

  return (
    <div>
      <form className={style.form}>
        <h1>Login</h1>
        <TextField
          variant="outlined"
          label="email"
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
        <div style={{color: "red"}}>{errorMessage}</div>
        <button type="button" onClick={onSubmit}>Login</button>
      </form>
    </div>
  );
}
