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
  FormLabel
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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