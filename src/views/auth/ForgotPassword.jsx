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
  FormErrorMessage,
  Link,
  useToast
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const toast = useToast();

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock API call to send OTP
    setTimeout(() => {
      // Log the action for mock purposes
      console.log('Sending OTP to email:', email);
      
      // Show success toast
      toast({
        title: 'OTP Sent',
        description: 'A verification code has been sent to your email.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      setIsSubmitting(false);
      
      // Navigate to OTP verification page
      // In a real app, we might pass the email via state or context
      navigate('/forgot-password/verify', { state: { email } });
    }, 1500);
  };

  return (
    <Container maxW="md" py={12}>
      <VStack spacing={8}>
        <Heading>Forgot Password</Heading>
        <Box w="100%" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Enter your email address and we'll send you a verification code to reset your password.
              </Text>
              
              <FormControl isInvalid={!!error}>
                <FormLabel>Email</FormLabel>
                <Input 
                  type="email" 
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              
              <Button 
                colorScheme="blue" 
                width="full" 
                mt={4} 
                type="submit"
                isLoading={isSubmitting}
                loadingText="Sending"
              >
                Send OTP
              </Button>
              
              <Text mt={4} textAlign="center">
                <Link as={RouterLink} to="/login" color="blue.500">
                  Back to Login
                </Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}

export default ForgotPassword; 