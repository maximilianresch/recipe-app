import React from "react";
import style from "./style.module.css";

import axios from "axios";
import * as auth from "../utils/auth";

import * as yup from "yup";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import { Input, InputGroup, Button, InputRightElement } from "@chakra-ui/react";

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
    } else {
      setErrorMessage("E-mail is already in use");
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
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
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
