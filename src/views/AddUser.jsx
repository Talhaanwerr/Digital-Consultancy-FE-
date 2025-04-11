import React, { useState } from 'react';
import {
  Box,
  Flex,
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
  BreadcrumbLink
} from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function AddUser() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
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

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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
    <Flex h="100vh">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <Box
        flex="1"
        ml={isSidebarOpen ? "240px" : "60px"}
        transition="margin-left 0.3s ease"
        p={8}
      >
        {/* Breadcrumb */}
        <Breadcrumb 
          spacing="8px" 
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
            <BreadcrumbLink>Add User</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

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
      </Box>
    </Flex>
  );
}

export default AddUser; 