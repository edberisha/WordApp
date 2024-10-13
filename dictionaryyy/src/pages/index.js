import { useState } from "react";
import { Box, Button, Link, Text } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import {TitleThing} from '../components/TitleThing'

export default function Home() {
  const { user, error, loginWithGoogle } = useAuth();



  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      window.location.href = "/main";
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"

    >

      {user && (
        <Text fontSize="lg" mb={4}>
          Logged in as: <strong>{user.email}</strong>
        </Text>
      )}
      <Box>
      <TitleThing />
      </Box>
      <Box 
        width={['80%','80%','40%','45%','35%','25%',]}
        p={50} 
        borderWidth={1} 
        borderRadius="20px" 
        border="5px solid #e07a5f"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.5)" // Custom shadow for depth
        backgroundColor="white"
        color="black"
      >
        
        {error && <Text 
        color="red.500" mb={4}>{error}</Text>}
       
      
        <Box
        mt="5%"
        display="flex"
        gap={3}
        flexDir="column"
   
        >
              <Button 
                fontSize={["10px","12px","14px","17px"]}
                color="white"
                bg="#81b29a" 
                padding={5}
                width="full" 
                onClick={handleGoogleSignIn}
                
              >
                Google Sign in
              </Button>
              <Link href="/main">
                <Button 
                                fontSize={["10px","12px","14px","17px"]}

                          color="white"
                          bg="#81b29a" 
                          padding={5}

                  colorScheme="teal" 
                  width="full" 
                >
                  Play Now
                </Button>
              </Link>
        </Box>

      </Box>
    </Box>
  );
}
