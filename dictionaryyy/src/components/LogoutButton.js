// components/LogoutButton.js
import { Button } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Optionally redirect or perform additional actions after logout
    window.location.href = "/"; // Redirect to home or login page
  };

  return (
    <Button colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
