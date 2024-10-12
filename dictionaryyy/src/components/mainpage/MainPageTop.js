import { Box, Button, Link} from '@chakra-ui/react';


export default function MainPageTop() {


  return (
    <>
    <Box
    mt="10vh"
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    gap={20}
    flexDir={['column','column','row','row','row','row']}
    // border="2px solid red"
    >
        <Box
        width="30%"
        border="5px solid #e07a5f"
        display="flex"
        justifyContent={"center"}
        gap={10}
        bg="white"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.5)" // Custom shadow for depth
        height="20vh"
        borderRadius={'50px'}
        alignItems={"center"}
        >
            <Link href="/definitiontrial">
              <Button
              color="white"
              bg='#3d405b'
              fontSize={["10px","12px","14px","15px","18px"]}
              >
                DEFINITION TRIAL
              </Button>
            </Link>

        </Box>
        <Box
        width="30%"
        border="5px solid #e07a5f"
        display="flex"
        justifyContent={"center"}
        gap={10}
        bg="white"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.5)" // Custom shadow for depth
        height="20vh"
        borderRadius={'50px'}
        alignItems={"center"}
        >


            <Link href="/spellingtrial">
              <Button
                fontSize={["10px","12px","14px","15px","18px"]}
                color="white"
                bg='#3d405b'

>
                SPELLING TRIAL
              </Button>
            </Link>
        </Box>
    </Box>
    </>
  );
}
