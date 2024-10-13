import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Link, Text } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import {TitleThing} from '../components/TitleThing'

export default function Home() {
  const { user, error, loginWithEmail, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);
      window.location.href = "/main";
    } catch (error) {
      console.error("Login error:", error);
    }
  };

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
        <FormControl 
        
          id="email" 
          mb={4}>
          <FormLabel 
          ></FormLabel>
          <Input
            fontSize={['sm','md','lg','xl']}
            width="100%" 
            color="black"
            bg={'white'}
            fontFamily={"raleway"}
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl 
        id="password" mb={4}>
          <FormLabel></FormLabel>
          <Input
            fontSize={['sm','md','lg','xl']}
            color="black"
            width="100%" 
            bg={'white'}
            fontFamily={"raleway"}
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button 
          padding={5}
          color="white"
          bg="#81b29a" 
          width="100%" 
          onClick={handleLogin}
        >
          Login
        </Button>
        <Box
        mt="5%"
        display="flex"
        gap={3}
   
        >
              <Button 
                color="white"
                bg="#81b29a" 
                padding={5}
                width="full" 
                onClick={handleGoogleSignIn}
                
              >
                Sign in with Google
              </Button>
              <Link href="/main">
                <Button 
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
