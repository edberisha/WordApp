import { Box} from '@chakra-ui/react';
import SpellingComponent from '../components/SpellingTrial/SpellingComponent';



export default function SpellingTrial({setCorrectSpellingCount}) {


  return (
    <>
    <Box
    mt="20vh"
    display={"flex"}
    justifyContent={"center"}
    >
        <SpellingComponent setCorrectSpellingCount={setCorrectSpellingCount}/>
    </Box>
    </>
  );
}
