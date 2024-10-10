
import localFont from "next/font/local";
import {Box, Text} from '@chakra-ui/react'
import WordComponent from '../components/WordComponent'



export default function Home() {
  return (
    <>
    <Box
    mt="20vh"
    display={"flex"}
    justifyContent={"center"}
    >
    <WordComponent />
    </Box>
    </>
  );
}
