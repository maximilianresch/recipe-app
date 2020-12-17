import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import style from './style.module.css'
import axios from 'axios'

import oldRecipe from "../assets/oldRecipe.jpeg";
import homeImage from "../assets/homeImage.svg";
import curveArrow from '../assets/curveArrow.svg';


export default function Home() {

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p="50px"
      m="50px"
    >
      <h1 style={{fontSize: "50px"}}>Recipe Editor</h1>
      <img src={homeImage} alt="" style={{ width: "100%", height: "60vh" }} />
      <Box pt="100px" fontSize="35px">
        <p>Do you have old recipes which look like that ?</p>
        <img src={oldRecipe} alt="" width={250} />
        <img className={style.arrow} src={curveArrow} alt="" />
      </Box>
    </Box>
  );
}
