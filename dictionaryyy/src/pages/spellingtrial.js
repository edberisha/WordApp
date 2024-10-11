import { Box} from '@chakra-ui/react';
import SpellingComponent from '../components/SpellingTrial/SpellingComponent';



export default function SpellingTrial() {


  return (
    <>
    <Box
    mt="20vh"
    display={"flex"}
    justifyContent={"center"}
    >
        <SpellingComponent />
    </Box>
    </>
  );
}
