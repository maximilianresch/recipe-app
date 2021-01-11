import React from "react";
import { Box } from "@material-ui/core";
import style from "./style.module.css";

import oldRecipe from "../assets/oldRecipe.jpeg";
import foodHome from "../assets/foodHome.jpg";
import curveArrow from "../assets/curveArrow.svg";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <img
        src={foodHome}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
      <Box pt="100px" fontSize="35px">
        <p>Do you have old recipes which look like that ?</p>
        <img src={oldRecipe} alt="" width={250} />
        <img className={style.arrow} src={curveArrow} alt="" />
      </Box>
    </Box>
  );
}
