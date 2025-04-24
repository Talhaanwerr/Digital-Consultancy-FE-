import React, { useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  IconButton,
  Image,
  Tooltip,
  Spacer,
  Collapse,
  Stack
} from '@chakra-ui/react';
import { 
  FiHome, 
  FiUsers, 
  FiSettings, 
  FiMenu, 
  FiChevronLeft,
  FiBarChart2,
  FiFileText,
  FiBriefcase,
  FiChevronDown,
  FiChevronRight,
  FiUser,
  FiPlus,
  FiLock,
  FiHelpCircle,
  FiLogOut
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

// Menu items configuration
const menuItems = [
  { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
  { name: 'Users', icon: FiUsers, path: '/users' },
  { name: 'NTN Registration', icon: FiFileText, path: '/ntn' },
  { 
    name: 'Business Registration', 
    icon: FiBriefcase, 
    children: [
      { name: 'Sole Proprietor', path: '/business/sole-proprietor', icon: FiUser },
      { name: 'Addition / deletion of Business to NTN', path: '/business/ntn-modification', icon: FiPlus },
      { name: 'Private Limited', path: '/business/private-limited', icon: FiLock }
    ]
  },
  { name: 'Company Return Filing', icon: FiFileText, path: '/company-return-filing' },
  { name: 'FAQs', icon: FiHelpCircle, path: '/faqs' },
];

function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({});

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSubmenu = (name) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Handle logout
  const handleLogout = () => {
    // In a real app, you would clear auth tokens, user data, etc.
    console.log('User logged out');
    
    // Navigate to login page
    navigate('/login');
  };

  // Check if a submenu should be open based on active route
  const isSubmenuOpen = (item) => {
    if (!item.children) return false;
    
    // Open if explicitly toggled
    if (openSubmenus[item.name]) return true;
    
    // Open if a child route is active
    const isChildActive = item.children.some(child => 
      location.pathname.startsWith(child.path)
    );
    
    return isChildActive;
  };

  // Function to render a menu item (both regular and parent items)
  const renderMenuItem = (item) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = hasChildren 
      ? item.children.some(child => location.pathname === child.path)
      : location.pathname === item.path;
    const submenuOpen = isSubmenuOpen(item);

    return (
      <Box key={item.name}>
        <Tooltip 
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
            onClick={hasChildren ? () => toggleSubmenu(item.name) : () => handleNavigation(item.path)}
          >
            <Icon as={item.icon} boxSize={5} />
            {isOpen && (
              <>
                <Text ml={3} flex="1">{item.name}</Text>
                {hasChildren && (
                  <Icon 
                    as={submenuOpen ? FiChevronDown : FiChevronRight} 
                    boxSize={4}
                  />
                )}
              </>
            )}
          </Flex>
        </Tooltip>

        {/* Submenu items */}
        {hasChildren && isOpen && (
          <Collapse in={submenuOpen} animateOpacity>
            <Stack spacing={0} pl={4} borderLeftWidth="1px" borderColor="whiteAlpha.300" ml={4}>
              {item.children.map((child) => {
                const isChildActive = location.pathname === child.path;
                
                return (
                  <Flex
                    key={child.name}
                    p={2}
                    pl={3}
                    alignItems="center"
                    cursor="pointer"
                    bg={isChildActive ? 'blue.500' : 'transparent'}
                    _hover={{ bg: 'blue.500' }}
                    onClick={() => handleNavigation(child.path)}
                    fontSize="sm"
                  >
                    <Icon as={child.icon} boxSize={4} />
                    <Text ml={2}>{child.name}</Text>
                  </Flex>
                );
              })}
            </Stack>
          </Collapse>
        )}
      </Box>
    );
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
      overflowY="auto"
      display="flex"
      flexDirection="column"
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
      <VStack align="stretch" spacing={0} mt={2} flex="1">
        {menuItems.map(renderMenuItem)}
      </VStack>
      
      {/* Logout Button */}
      <Box borderTopWidth="1px" borderColor="whiteAlpha.300" p={2}>
        <Tooltip
          label="Logout"
          placement="right"
          isDisabled={isOpen}
          hasArrow
        >
          <Flex
            p={3}
            alignItems="center"
            cursor="pointer"
            _hover={{ bg: 'blue.600' }}
            borderRadius="md"
            justifyContent={isOpen ? "flex-start" : "center"}
            onClick={handleLogout}
          >
            <Icon as={FiLogOut} boxSize={5} />
            {isOpen && <Text ml={3}>Logout</Text>}
          </Flex>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Sidebar;