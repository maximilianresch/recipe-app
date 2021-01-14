import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

import axios from "axios";
import * as auth from "../utils/auth";

import * as yup from "yup";

import { Input, InputGroup, Button, InputRightElement } from "@chakra-ui/react";

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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
    window.location.reload(false);
  };

  const handleKeypress = (e) => {
    if (e.which === 13) {
      onSubmit();
    }
  };

  return (
    <div>
      <form className={style.form}>
        <h1>Login</h1>
        <div>
          <Input
            variant="filled"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyPress={handleKeypress}
          ></Input>
        </div>
        <div>
          <InputGroup>
            <Input
              variant="filled"
              placeholder="password"
              type={show ? "text" : "password"}
              onKeyPress={handleKeypress}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick} >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
        <div style={{ color: "red" }}>{errorMessage}</div>

       
          <Button colorScheme="blue" variant="outline" onClick={onSubmit}>
            change
          </Button>
      
      </form>
    </div>
  );
}
