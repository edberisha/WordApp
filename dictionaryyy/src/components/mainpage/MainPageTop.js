import { Box, Button, Link} from '@chakra-ui/react';


export default function MainPageTop() {


  return (
    <>
    <Box
    mt="20vh"
    display={"flex"}
    justifyContent={"center"}
    gap={20}
    >
    <Link href="/definitiontrial">
      <Button>
        DEFINITION TRIAL
      </Button>
    </Link>

    <Link href="/spellingtrial">
      <Button >
        SPELLING TRIAL
      </Button>
    </Link>
  
    </Box>
    </>
  );
}
