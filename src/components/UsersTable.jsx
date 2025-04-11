import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  Badge,
  Text,
  Flex,
  Button,
  Box,
  Select
} from '@chakra-ui/react';
import { FiEdit, FiTrash2, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function UsersTable({ 
  users, 
  onEdit, 
  onDelete, 
  onView,
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange
}) {
  // Function to render status badge with appropriate color
  const renderStatus = (status) => {
    const colorScheme = status === 'active' ? 'green' : 'red';
    return (
      <Badge colorScheme={colorScheme} borderRadius="full" px={2}>
        {status}
      </Badge>
    );
  };

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max pages to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of page range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the beginning
      if (currentPage <= 2) {
        endPage = 4;
      }
      
      // Adjust if we're at the end
      if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Phone Number</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>{user.phone}</Td>
                <Td>{renderStatus(user.status)}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label="View user"
                      icon={<FiEye />}
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => onView(user.id)}
                    />
                    <IconButton
                      aria-label="Edit user"
                      icon={<FiEdit />}
                      size="sm"
                      colorScheme="green"
                      variant="ghost"
                      onClick={() => onEdit(user.id)}
                    />
                    <IconButton
                      aria-label="Delete user"
                      icon={<FiTrash2 />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => onDelete(user.id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={5}>
                <Text textAlign="center" py={4}>No users found</Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      
      {/* Pagination Controls */}
      {users.length > 0 && (
        <Flex justifyContent="space-between" alignItems="center" mt={4} px={2}>
          <HStack>
            <Text fontSize="sm">Rows per page:</Text>
            <Select 
              size="sm" 
              width="70px" 
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Select>
          </HStack>
          
          <HStack spacing={2}>
            <IconButton
              icon={<FiChevronLeft />}
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              aria-label="Previous page"
            />
            
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <Text key={`ellipsis-${index}`} mx={1}>...</Text>
              ) : (
                <Button
                  key={page}
                  size="sm"
                  variant={currentPage === page ? "solid" : "outline"}
                  colorScheme={currentPage === page ? "blue" : "gray"}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              )
            ))}
            
            <IconButton
              icon={<FiChevronRight />}
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              aria-label="Next page"
            />
          </HStack>
        </Flex>
      )}
    </Box>
  );
}

export default UsersTable; 