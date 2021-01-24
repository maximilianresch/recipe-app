import React from "react";
import { Box, Icon, Link } from "@chakra-ui/react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
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

        <div
          style={{
            padding: "10px",
            display: "flex",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          <span>
            <Link href="https://github.com/maximilianresch" target="_blank">
              <Icon boxSize={5} as={FiGithub} />
            </Link>
          </span>
          <span>
            <Link
              href="https://www.linkedin.com/in/maximilian-resch-8aa9a81ba/"
              target="_blank"
            >
              <Icon boxSize={5} as={FiLinkedin} />
            </Link>
          </span>
        </div>
      </div>
    </Box>
  );
}
