import { Box} from '@chakra-ui/react';
import WordComponent from '../components/DefinitionTrial/DefinitionComponent'


export default function DefinitionTrial() {


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
