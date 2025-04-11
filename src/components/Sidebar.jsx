import React from 'react';
import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  IconButton,
  Image,
  Tooltip,
  Spacer
} from '@chakra-ui/react';
import { 
  FiHome, 
  FiUsers, 
  FiSettings, 
  FiMenu, 
  FiChevronLeft,
  FiBarChart2,
  FiFileText
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

// Menu items configuration
const menuItems = [
  { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
  { name: 'Users', icon: FiUsers, path: '/users' },
];

function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      position="fixed"
      left={0}
      h="100vh"
      bg="blue.700"
      color="white"
      w={isOpen ? "240px" : "60px"}
      transition="width 0.3s ease"
      boxShadow="md"
    >
      {/* Logo and Toggle Button */}
      <Flex 
        p={3} 
        alignItems="center" 
        justifyContent={isOpen ? "space-between" : "center"}
      >
        {isOpen && (
          <Image 
            src="https://via.placeholder.com/40" 
            alt="Logo" 
            boxSize="40px" 
            borderRadius="md"
          />
        )}
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isOpen ? <FiChevronLeft /> : <FiMenu />}
          onClick={onToggle}
          variant="ghost"
          color="white"
          _hover={{ bg: 'blue.600' }}
        />
      </Flex>
      
      {/* Separator - using Box instead of Divider */}
      <Box borderBottomWidth="1px" borderColor="whiteAlpha.300" />
      
      {/* Menu Items */}
      <VStack align="stretch" spacing={1} mt={4}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Tooltip 
              key={item.name}
              label={item.name} 
              placement="right" 
              isDisabled={isOpen}
              hasArrow
            >
              <Flex
                p={3}
                alignItems="center"
                cursor="pointer"
                bg={isActive ? 'blue.600' : 'transparent'}
                _hover={{ bg: 'blue.600' }}
                justifyContent={isOpen ? "flex-start" : "center"}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon as={item.icon} boxSize={5} />
                {isOpen && <Text ml={3}>{item.name}</Text>}
              </Flex>
            </Tooltip>
          );
        })}
      </VStack>
    </Box>
  );
}

export default Sidebar;