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
  Link,
  Flex
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Mock login check - replace with actual authentication later
    setTimeout(() => {
      // Simple validation
      if (email && password) {
        // Navigate to dashboard on successful login
        navigate('/dashboard');
      } else {
        setError('Please enter both email and password');
      }
      setIsLoading(false);
    }, 1000);
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
              
              <Flex justifyContent="flex-end" width="100%">
                <Link 
                  as={RouterLink} 
                  to="/forgot-password" 
                  color="blue.500" 
                  fontSize="sm"
                >
                  Forgot password?
                </Link>
              </Flex>
              
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
              
              <Text mt={4} textAlign="center">
                Don't have an account?{' '}
                <Link as={RouterLink} to="/register" color="blue.500">
                  Register
                </Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}

export default Login; 