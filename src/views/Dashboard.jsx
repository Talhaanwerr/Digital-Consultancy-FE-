import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

function Dashboard() {
  console.log("Dashboard component rendered");
  return (
    <>
      <Heading mb={6}>Dashboard</Heading>
      <Text fontSize="lg">
        Welcome to your dashboard! This is where you'll see your important metrics and data.
      </Text>
      
      {/* Placeholder content */}
      <Box mt={8} p={6} bg="gray.50" borderRadius="md" boxShadow="sm">
        <Heading size="md" mb={4}>Quick Stats</Heading>
        <Text>This is a placeholder for dashboard content. In a real application, you would display charts, tables, and other data visualizations here.</Text>
      </Box>
    </>
  );
}

export default Dashboard;