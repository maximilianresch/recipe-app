import React from "react";
import { Box, Button, Link } from "@chakra-ui/react";
import {ArrowRightIcon} from '@chakra-ui/icons'
import style from "./style.module.css";

import { useRecoilState } from 'recoil';
import { userState } from '../globalState';

export default function Home() {
  const [user, setUser] = useRecoilState(userState)

  return (
    <Box >
      <div className={style.bg}>
      
        <div className={style.homeHeading}>RECIPE</div>
        <div>
        {!user && (
        <Link href="/register">
        <Button rightIcon={<ArrowRightIcon boxSize={3} />} variant="solid" colorScheme="blue" color="#F0F1F2">Get started</Button>
      </Link>
    )}
    </div>
      </div>
    </Box>
  );
}
