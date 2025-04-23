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

function Register() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const toast = useToast();

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
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    
    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Check password match
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
    
    // Mock API call - would be replaced with actual registration logic
    setTimeout(() => {
      // Log form data (as per requirements)
      console.log('Registration form data:', formData);
      
      // Show success toast
      toast({
        title: 'Registration successful',
        description: 'Your account has been created.',
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
        <Heading>Create an Account</Heading>
        <Box w="100%" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="name" isInvalid={errors.name}>
                <FormLabel>Full Name</FormLabel>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              
              <FormControl id="email" isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              
              <FormControl id="password" isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input 
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              
              <FormControl id="confirmPassword" isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input 
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>
              
              <Button 
                colorScheme="blue" 
                width="full" 
                mt={6} 
                type="submit"
                isLoading={isSubmitting}
              >
                Register
              </Button>
              
              <Text mt={4} textAlign="center">
                Already have an account?{' '}
                <Link as={RouterLink} to="/login" color="blue.500">
                  Log in
                </Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}

export default Register; 