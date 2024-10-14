import "@/styles/globals.css";
import { ChakraProvider, Box } from '@chakra-ui/react'; // Import ChakraProvider
import { AuthProvider } from '../hooks/AuthContext';
import ActiveUserDisplay from "../components/activeuserDisplay"; // Ensure the name matches
import {useState} from 'react'

export default function App({ Component, pageProps }) {

  const [correctSpellingCount, setCorrectSpellingCount] = useState(null);

  return (
    <ChakraProvider> 
      <AuthProvider>
        <Box 
        height="100vh" 
        bg="#f4f1de"
        >
          <ActiveUserDisplay correctSpellingCount = {correctSpellingCount}/>
          <Box >
           <Component setCorrectSpellingCount={setCorrectSpellingCount} {...pageProps} />
          </Box>
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}
