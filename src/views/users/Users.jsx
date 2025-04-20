import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Input, 
  InputGroup, 
  InputLeftElement,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { FiSearch, FiUserPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import UsersTable from '../../components/UsersTable';

// Mock data for users - expanded for pagination example
const initialUsers = [
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

function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredUsers.slice(startIndex, endIndex);
  };

  // Reset to first page when search query or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, pageSize]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
  };

  // Handle user actions
  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
    navigate(`/users/edit/${userId}`);
  };

  const handleDelete = (userId) => {
    console.log(`Delete user with ID: ${userId}`);
    // In a real app, show confirmation dialog and delete from API
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleView = (userId) => {
    console.log(`View user with ID: ${userId}`);
    navigate(`/users/view/${userId}`);
  };

  const handleAddUser = () => {
    navigate('/users/add');
  };

  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <>
      <Heading mb={6}>Users</Heading>
      
      {/* Search and Add User */}
      <Box mb={6} display="flex" justifyContent="space-between">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input 
            placeholder="Search by username or email" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        
        <Button 
          leftIcon={<FiUserPlus />} 
          colorScheme="blue" 
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>
      
      {/* Users Table with Pagination */}
      <Box 
        bg={bgColor} 
        borderRadius="md" 
        boxShadow="sm" 
        overflow="hidden"
      >
        <UsersTable 
          users={getCurrentPageData()} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          onView={handleView}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </Box>
    </>
  );
}

export default Users; 