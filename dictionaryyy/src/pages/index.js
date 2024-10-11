import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Heading, Link, Text } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

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
      mt="20vh"
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
      <Heading mb={6}>Login</Heading>
      <Box 
        p={8} 
        borderWidth={1} 
        borderRadius="20px" 
        border="2px solid red"
        boxShadow="lg"
        backgroundColor="white"
        color="black"
      >
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button 
          colorScheme="teal" 
          width="full" 
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button 
          colorScheme="teal" 
          width="full" 
          mt={4}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
        <Link href="/main">
          <Button 
            colorScheme="teal" 
            width="full" 
            mt={4}
          >
            Play as Guest
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
