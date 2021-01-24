import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

import axios from "axios";
import * as auth from "../utils/auth";

import * as yup from "yup";

import {
  Input,
  InputGroup,
  Button,
  InputLeftElement,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import Register from "./Register";

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();
  const handleClick = () => setShow(!show);

  const router = useHistory();

  const onSubmit = async () => {
    const newLogin = { email, password };

    const valid = await schema.validate(newLogin).catch((e) => {
      const errorMessage = e.errors;
      setErrorMessage(errorMessage);
    });

    if (!valid) {
      return toast({
        title: "An error occurred.",
        description: "Unable to create user account!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
            <InputLeftElement>
              <Button size="sm" onClick={handleClick}>
                {show ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputLeftElement>
          </InputGroup>
        </div>
        <div style={{ color: "red" }}>{errorMessage}</div>

        <Button colorScheme="blue" variant="outline" onClick={onSubmit}>
          login
        </Button>
        <div>
          <Text style={{ paddingTop: "50px" }}>Don't have an Account ?</Text>
          <Text align="center">
            <Link href="/register" color="#327AD1">
              Register
            </Link>
          </Text>
        </div>
      </form>
    </div>
  );
}
