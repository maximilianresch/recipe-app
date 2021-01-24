import React from "react";
import style from "./style.module.css";

import axios from "axios";
import * as auth from "../utils/auth";

import * as yup from "yup";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
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
  const toast = useToast();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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

    const response = await axios.post("http://localhost:4000/register", data);

    if (response.data.success) {
      auth.getUserToken(response.data.token);
      router.push("/me");
      return toast({
        title: "Account created.",
        description: "Account successfully created!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setErrorMessage("E-mail is already in use");
      return toast({
        title: "An error occurred.",
        description: "Unable to create user account!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
        <div className={style.nameInput}>
          <Box display="flex" flexDirection="row" gridGap="5px">
            <Input
              variant="filled"
              placeholder="firstname"
              onKeyPress={handleKeypress}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            ></Input>

            <Input
              variant="filled"
              placeholder="lastname"
              onKeyPress={handleKeypress}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            ></Input>
          </Box>
        </div>
        <div>
          <Box mt="3">
            <Input
              variant="filled"
              placeholder="email"
              type="email"
              onKeyPress={handleKeypress}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Input>
          </Box>
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
          register
        </Button>
        <div>
          <Text style={{ paddingTop: "50px" }}>Already using Recipe ?</Text>
          <Text align="center">
            <Link href="/login" color="#327AD1">
              Sign in
            </Link>
          </Text>
        </div>
      </form>
    </div>
  );
}
