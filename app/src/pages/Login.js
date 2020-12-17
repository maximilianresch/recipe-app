import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

import axios from "axios";
import * as auth from "../utils/auth";

import TextField from "@material-ui/core/TextField";
import * as yup from "yup";

import { useRecoilState } from 'recoil'
import { userState } from '../globalState';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useRecoilState(userState);

  const router = useHistory();

  const onSubmit = async () => {
    const newLogin = { email, password };

    const valid = await schema.validate(newLogin).catch((e) => {
      const errorMessage = e.errors;
      setErrorMessage(errorMessage);
    });

    if (!valid) {
      return;
    }

    console.log("login", {
      email,
      password,
    });

    setErrorMessage("");

    const data = {
      email,
      password,
    };

    


    const response = await axios.post("http://localhost:4000/login", data);
    if (response.data.success) {
      auth.saveUserToken(response.data.token);
      router.push("/me");
    } else {
      setErrorMessage("E-mail or password is invalid");
    }
    console.log("response", response);
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
        <div style={{ color: "red" }}>{errorMessage}</div>
        <button type="button" onClick={onSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}
