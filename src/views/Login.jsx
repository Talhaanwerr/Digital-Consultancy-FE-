import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Input, 
  VStack, 
  Heading, 
  Container,
  Text,
  FormControl,
  FormLabel,
  useToast,
  Checkbox
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Use either admin login or regular login based on checkbox
      const response =  await AuthService.adminLogin(email, password)
      console.log("Loginresponse:", response);
      
      toast({
        title: "Login successful",
        description: response.message || "You have been logged in successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      // Navigate to dashboard after successful login
      // navigate('/dashboard');
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || 
        "An error occurred during login. Please check your credentials."
      );
      
      toast({
        title: "Login failed",
        description: err.response?.data?.message || "Invalid credentials",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="md" py={12}>
      <VStack spacing={8}>
        <Heading>Login</Heading>
        <Box w="100%" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <form onSubmit={handleLogin}>
            <VStack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              {error && <Text color="red.500">{error}</Text>}
              <Button 
                colorScheme="blue" 
                width="full" 
                mt={4} 
                type="submit"
                isLoading={isLoading}
              >
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}

export default Login; 