// components/UserEmail.js
import { Text, Box, Link, Button } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth'; 
import LogoutButton from '../components/LogoutButton'; 
import UserProfile from './UserProfile';

const ActiveUserDisplay = () => {
  const { userId } = useAuth(); 

  return (
    <Box 
    pt="5vw"
    pl="5vw">
      {userId ? (
        <>
          <Text fontSize="lg">
            Logged in as: <strong>{userId}</strong>
          </Text>
          <LogoutButton />
          <Link href="/">
          <Text>
            HOME
          </Text>
          </Link>
          <UserProfile />
        </>
      ) : (
        <Box
        pt="5vw"
        pl="5vw"
        >
                <Text fontSize="lg">Not logged in</Text>
                <Link href="/">
                <Button>
                HOME
                </Button>
                </Link>
        </Box>
        
      )}
    </Box>
  );
};

export default ActiveUserDisplay;
