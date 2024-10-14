import "@/styles/globals.css";
import { ChakraProvider, Box } from '@chakra-ui/react'; // Import ChakraProvider
import { AuthProvider } from '../hooks/AuthContext';
import ActiveUserDisplay from "../components/activeuserDisplay"; // Ensure the name matches

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider> 
      <AuthProvider>
        <Box 
        height="100vh" 
        bg="#f4f1de"
 
        >
          <ActiveUserDisplay />
          <Box >
           <Component {...pageProps} />
          </Box>
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}
