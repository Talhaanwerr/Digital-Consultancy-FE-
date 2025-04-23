import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  VStack, 
  Heading, 
  Container,
  Text,
  HStack,
  PinInput,
  PinInputField,
  FormControl,
  FormErrorMessage,
  Link,
  useToast
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  // Get email from location state
  useEffect(() => {
    // If user navigated here with state containing email
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      // If no email in state, redirect back to forgot password
      toast({
        title: 'Error',
        description: 'Please enter your email first',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      navigate('/forgot-password');
    }
  }, [location, navigate, toast]);

  // Handle OTP input change
  const handleOtpChange = (value) => {
    setOtp(value);
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate OTP
    if (!otp || otp.length !== 4) {
      setError('Please enter a valid 4-digit code');
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock API call to verify OTP
    setTimeout(() => {
      // For demo purposes, accept any 4-digit code
      console.log('Verifying OTP:', otp, 'for email:', email);
      
      // Show success toast
      toast({
        title: 'OTP Verified',
        description: 'Your verification code has been confirmed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      setIsSubmitting(false);
      
      // Navigate to reset password page
      navigate('/forgot-password/reset', { state: { email, verified: true } });
    }, 1500);
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    console.log('Resending OTP to email:', email);
    
    toast({
      title: 'OTP Resent',
      description: 'A new verification code has been sent to your email.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="md" py={12}>
      <VStack spacing={8}>
        <Heading>Verify OTP</Heading>
        <Box w="100%" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Please enter the 4-digit verification code sent to 
                <Text as="span" fontWeight="bold"> {email}</Text>
              </Text>
              
              <FormControl isInvalid={!!error}>
                <HStack justifyContent="center">
                  <PinInput 
                    size="lg" 
                    value={otp} 
                    onChange={handleOtpChange} 
                    otp
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <FormErrorMessage textAlign="center">{error}</FormErrorMessage>
              </FormControl>
              
              <Button 
                colorScheme="blue" 
                width="full" 
                type="submit"
                isLoading={isSubmitting}
                loadingText="Verifying"
              >
                Verify OTP
              </Button>
              
              <HStack spacing={2} justifyContent="center">
                <Text fontSize="sm">Didn't receive the code?</Text>
                <Link 
                  fontSize="sm" 
                  color="blue.500" 
                  onClick={handleResendOTP}
                  _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Resend OTP
                </Link>
              </HStack>
              
              <Text fontSize="sm" textAlign="center">
                <Link as={RouterLink} to="/forgot-password" color="blue.500">
                  Change Email
                </Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}

export default VerifyOTP; 