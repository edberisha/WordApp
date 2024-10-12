import "@/styles/globals.css";
import { ChakraProvider, Box } from '@chakra-ui/react'; // Import ChakraProvider
import { AuthProvider } from '../hooks/AuthContext';
import ActiveUserDisplay from "../components/activeuserDisplay"; // Ensure the name matches

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider> {/* Wrap your app with ChakraProvider */}
      <AuthProvider>
        <Box height="100vh" bg="#f4f1de">
          <div className="app">
            {/* You can include other components here if needed */}
          </div>
          <ActiveUserDisplay />
          <Component {...pageProps} />
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}
