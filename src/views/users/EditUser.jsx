import React, { useState, useEffect } from 'react';
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
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate, useParams, Link } from 'react-router-dom';

// Mock data for users - same as in Users.jsx
const mockUsers = [
  { id: 1, username: 'johndoe', email: 'john@example.com', phone: '123-456-7890', status: 'active' },
  { id: 2, username: 'janedoe', email: 'jane@example.com', phone: '098-765-4321', status: 'inactive' },
  { id: 3, username: 'bobsmith', email: 'bob@example.com', phone: '555-123-4567', status: 'active' },
  { id: 4, username: 'alicegreen', email: 'alice@example.com', phone: '555-987-6543', status: 'active' },
  { id: 5, username: 'mikebrown', email: 'mike@example.com', phone: '444-333-2222', status: 'inactive' },
  { id: 6, username: 'sarahjones', email: 'sarah@example.com', phone: '222-333-4444', status: 'active' },
  { id: 7, username: 'tomwilson', email: 'tom@example.com', phone: '111-222-3333', status: 'active' },
  { id: 8, username: 'emilydavis', email: 'emily@example.com', phone: '777-888-9999', status: 'inactive' },
  { id: 9, username: 'davidmiller', email: 'david@example.com', phone: '666-555-4444', status: 'active' },
  { id: 10, username: 'oliviamoore', email: 'olivia@example.com', phone: '333-222-1111', status: 'active' },
  { id: 11, username: 'williamtaylor', email: 'william@example.com', phone: '999-888-7777', status: 'inactive' },
  { id: 12, username: 'sophiabrown', email: 'sophia@example.com', phone: '444-555-6666', status: 'active' },
  { id: 13, username: 'jamesanderson', email: 'james@example.com', phone: '222-111-3333', status: 'active' },
  { id: 14, username: 'emmawilson', email: 'emma@example.com', phone: '777-666-5555', status: 'inactive' },
  { id: 15, username: 'danieljohnson', email: 'daniel@example.com', phone: '888-999-0000', status: 'active' },
];

function EditUser() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    status: false // false = inactive, true = active
  });

  // Fetch user data
  useEffect(() => {
    // Simulate API call to fetch user data
    setIsLoading(true);
    setTimeout(() => {
      const userId = parseInt(id);
      const user = mockUsers.find(user => user.id === userId);
      
      if (user) {
        setFormData({
          username: user.username,
          email: user.email,
          phone: user.phone,
          status: user.status === 'active'
        });
        setIsLoading(false);
      } else {
        setError('User not found');
        setIsLoading(false);
      }
    }, 500); // Simulate network delay
  }, [id]);

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
      id: parseInt(id),
      status: formData.status ? 'active' : 'inactive'
    };

    // Simulate API call
    console.log('Updating user data:', userData);
    
    // Simulate delay for API call
    setTimeout(() => {
      toast({
        title: 'User updated',
        description: `User ${userData.username} has been updated successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      navigate('/users');
    }, 1000);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
        <Button mt={4} onClick={() => navigate('/users')}>
          Back to Users
        </Button>
      </>
    );
  }

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        separator={<FiChevronRight color="gray.500" />}
        mb={6}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/users">Users</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Edit User</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <Heading mb={6}>Edit User</Heading>
      
      <Box 
        bg="white" 
        p={6} 
        borderRadius="md" 
        boxShadow="sm"
        maxW="800px"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">
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
                loadingText="Updating"
              >
                Update User
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

export default EditUser; 