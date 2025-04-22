import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  Divider,
  Grid,
  GridItem,
  useColorModeValue
} from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { useNavigate, useParams, Link } from 'react-router-dom';
import BreadcrumbNav from '../../components/BreadcrumbNav';

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

function ViewUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Fetch user data
  useEffect(() => {
    // Simulate API call to fetch user data
    setIsLoading(true);
    setTimeout(() => {
      const userId = parseInt(id);
      const user = mockUsers.find(user => user.id === userId);
      
      if (user) {
        setUserData(user);
        setIsLoading(false);
      } else {
        setError('User not found');
        setIsLoading(false);
      }
    }, 500); // Simulate network delay
  }, [id]);

  const handleEdit = () => {
    navigate(`/users/edit/${id}`);
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
      <BreadcrumbNav 
        items={[
          { label: 'Users', path: '/users' },
          { label: 'View User', path: '#', isCurrentPage: true }
        ]}
      />
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading>User Details</Heading>
        <Button 
          leftIcon={<FiEdit />} 
          colorScheme="blue" 
          onClick={handleEdit}
        >
          Edit
        </Button>
      </Box>
      
      <Box 
        bg={bgColor} 
        p={6} 
        borderRadius="md" 
        boxShadow="sm"
        maxW="800px"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <VStack spacing={4} align="stretch">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Heading size="md">{userData.username}</Heading>
            <Badge 
              colorScheme={userData.status === 'active' ? 'green' : 'red'} 
              fontSize="0.8em" 
              p={1} 
              borderRadius="full"
            >
              {userData.status}
            </Badge>
          </Box>
          
          <Divider />
          
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold" color="gray.500">Email</Text>
              <Text>{userData.email}</Text>
            </GridItem>
            
            <GridItem>
              <Text fontWeight="bold" color="gray.500">Phone</Text>
              <Text>{userData.phone}</Text>
            </GridItem>
            
            <GridItem>
              <Text fontWeight="bold" color="gray.500">User ID</Text>
              <Text>{userData.id}</Text>
            </GridItem>
          </Grid>
          
          <Divider />
          
          <HStack spacing={4}>
            <Button 
              variant="outline" 
              onClick={() => navigate('/users')}
            >
              Back to Users
            </Button>
          </HStack>
        </VStack>
      </Box>
    </>
  );
}

export default ViewUser; 