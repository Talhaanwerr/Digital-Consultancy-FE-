import React, { useState } from 'react';
import { Box, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  // For smaller screens, we might want to use Chakra's useDisclosure
  // For this implementation, we'll use a simple state for the sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
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
        <Heading mb={6}>Dashboard</Heading>
        <Text fontSize="lg">
          Welcome to your dashboard! This is where you'll see your important metrics and data.
        </Text>
        
        {/* Placeholder content */}
        <Box mt={8} p={6} bg="gray.50" borderRadius="md" boxShadow="sm">
          <Heading size="md" mb={4}>Quick Stats</Heading>
          <Text>This is a placeholder for dashboard content. In a real application, you would display charts, tables, and other data visualizations here.</Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default Dashboard;