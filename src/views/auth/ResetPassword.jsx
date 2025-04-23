import React, { useState, useEffect } from 'react';
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
  useToast
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';

function ResetPassword() {
  // Form state
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  // Check if user is verified from previous step
  useEffect(() => {
    if (location.state && location.state.email && location.state.verified) {
      setEmail(location.state.email);
      setIsVerified(true);
    } else {
      // If not properly verified, redirect back
      toast({
        title: 'Error',
        description: 'Please complete the verification process first',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      navigate('/forgot-password');
    }
  }, [location, navigate, toast]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Check password match on the fly
    if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
      if (name === 'password' && value !== formData.confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: 'Passwords do not match'
        });
      } else if (name === 'confirmPassword' && value !== formData.password) {
        setErrors({
          ...errors,
          confirmPassword: 'Passwords do not match'
        });
      } else {
        setErrors({
          ...errors,
          confirmPassword: ''
        });
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Check required fields
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    
    // Check password match
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Password strength check (simple example)
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Mock API call to reset password
    setTimeout(() => {
      // Log the action (would be an API call in real app)
      console.log('Resetting password for email:', email, 'New password:', formData.password);
      
      // Show success toast
      toast({
        title: 'Password Reset Successful',
        description: 'Your password has been reset successfully. You can now log in with your new password.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      setIsSubmitting(false);
      
      // Redirect to login page
      navigate('/login');
    }, 1500);
  };

  return (
    <Container maxW="md" py={12}>
      <VStack spacing={8}>
        <Heading>Reset Password</Heading>
        <Box w="100%" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Create a new password for your account 
                <Text as="span" fontWeight="bold"> {email}</Text>
              </Text>
              
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>New Password</FormLabel>
                <Input 
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              
              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel>Confirm New Password</FormLabel>
                <Input 
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>
              
              <Button 
                colorScheme="blue" 
                width="full" 
                mt={4} 
                type="submit"
                isLoading={isSubmitting}
                loadingText="Resetting"
              >
                Reset Password
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}

export default ResetPassword; 