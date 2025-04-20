import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';

function MainLayout({ children }) {
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
        {children}
      </Box>
    </Flex>
  );
}

export default MainLayout; 