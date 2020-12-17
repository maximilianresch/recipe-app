import React from "react";
import { Box } from "@material-ui/core";
import style from "./style.module.css";

export default function Footer() {
  return (
    <Box>
      <div className={style.footer}>
        <div>
          <span className={style.span}>
            <p>© recipe-app.at</p>
            <p>Impressum</p>
            <p>AGB</p>
            <p>Datenschutzerklärung</p>
          </span>
        </div>
        <div>
          <span className={style.span}>
            <p> max.mustermann@gmail.com</p>
            <p> +43 650 1234123 </p>
          </span>
        </div>
      </div>
    </Box>
  );
}
