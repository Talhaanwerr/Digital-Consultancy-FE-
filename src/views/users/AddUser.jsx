import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Switch,
  FormHelperText,
  useToast
} from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import BreadcrumbNav from '../../components/BreadcrumbNav';

function AddUser() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    status: false // false = inactive, true = active
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleStatusChange = () => {
    setFormData({
      ...formData,
      status: !formData.status
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Convert status boolean to string for API
    const userData = {
      ...formData,
      status: formData.status ? 'active' : 'inactive'
    };

    // Simulate API call
    console.log('Submitting user data:', userData);
    
    // Simulate delay for API call
    setTimeout(() => {
      toast({
        title: 'User created.',
        description: `User ${formData.username} has been created successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      navigate('/users');
    }, 1500);
  };

  return (
    <>
      <BreadcrumbNav 
        items={[
          { label: 'Users', path: '/users' },
          { label: 'Add User', path: '#', isCurrentPage: true }
        ]}
      />

      <Heading mb={6}>Add New User</Heading>
      
      <Box 
        bg="white" 
        p={6} 
        borderRadius="md" 
        boxShadow="sm"
        maxW="800px"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="flex-start">
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input 
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter username"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </FormControl>
            
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="status" mb="0">
                Status
              </FormLabel>
              <Switch 
                id="status" 
                colorScheme="green"
                isChecked={formData.status}
                onChange={handleStatusChange}
              />
              <FormHelperText ml={2}>
                {formData.status ? 'Active' : 'Inactive'}
              </FormHelperText>
            </FormControl>
            
            <HStack spacing={4} width="100%" pt={4}>
              <Button 
                colorScheme="blue" 
                type="submit"
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Create User
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/users')}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </>
  );
}

export default AddUser; 