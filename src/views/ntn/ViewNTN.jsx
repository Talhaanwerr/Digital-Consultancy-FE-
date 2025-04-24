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
  AlertTitle,
  AlertDescription,
  Divider,
  Grid,
  GridItem,
  useColorModeValue,
  Icon,
  Image,
  Flex,
  IconButton,
  Link,
} from '@chakra-ui/react';
import { FiPhone, FiUser, FiChevronLeft, FiDownload, FiFile } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import BreadcrumbNav from '../../components/BreadcrumbNav';

const ntnData = [
  {
    id: 1,
    telecom: "ufone",
    cnicFrontUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    cnicBackUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    phone: "+923001234567",
    applicationStatus: "approved", // green
    invoiceStatus: "paid", //green
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
  },
  {
    id: 2,
    telecom: "jazz",
    cnicFrontUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    cnicBackUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    phone: "+923009876543",
    applicationStatus: "requested", //orange
    invoiceStatus: "unpaid", // red
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
  },
  {
    id: 3,
    telecom: "jazz",
    cnicFrontUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    cnicBackUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    phone: "+923009876543",
    applicationStatus: "rejected", // red
    invoiceStatus: "unpaid",
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
  },
  {
    id: 4,
    telecom: "jazz",
    cnicFrontUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    cnicBackUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    phone: "+923009876543",
    applicationStatus: "working", //blue
    invoiceStatus: "unpaid",
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
  },
  {
    id: 5,
    telecom: "jazz",
    cnicFrontUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    cnicBackUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
    fbrCredentials: {
      username: "username123",
      password: "password123",
    },
    phone: "+923009876543",
    applicationStatus: "requested",
    invoiceStatus: "unpaid",
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
  },
];

function ViewNTN() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filingData, setFilingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Simulated API call to fetch the NTN filing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const record = ntnData.find((item) => item.id === parseInt(id));
        
        if (!record) {
          throw new Error("NTN record not found");
        }
        
        setFilingData(record);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching NTN record:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle document download
  const handleDownload = (url, fileName) => {
    // In a real application, this would trigger a file download
    console.log(`Downloading ${fileName} from ${url}`);
    alert(`Downloading ${fileName}...`);
  };

  // Function to render status badge with appropriate color
  const renderStatusBadge = (status) => {
    let colorScheme;

    switch (status.toLowerCase()) {
      case "approved":
        colorScheme = "green";
        break;
      case "rejected":
        colorScheme = "red";
        break;
      case "working":
        colorScheme = "blue";
        break;
      case "requested":
        colorScheme = "orange";
        break;
      case "paid":
        colorScheme = "green";
        break;
      case "unpaid":
        colorScheme = "red";
        break;
      default:
        colorScheme = "gray";
    }

    return (
      <Badge colorScheme={colorScheme} borderRadius="full" px={2}>
        {status}
      </Badge>
    );
  };

  // Handle back button click
  const handleBack = () => {
    navigate("/ntn");
  };

  if (loading) {
    return (
      <Box py={5}>
        <BreadcrumbNav />
        <Flex justifyContent="center" alignItems="center" height="60vh">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={5}>
        <BreadcrumbNav />
        <Alert status="error" borderRadius="md" mt={6}>
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button
          leftIcon={<FiChevronLeft />}
          mt={4}
          onClick={handleBack}
          colorScheme="blue"
          variant="outline"
        >
          Back to NTN List
        </Button>
      </Box>
    );
  }

  return (
    <Box py={5}>
      <BreadcrumbNav />

      <Button
        leftIcon={<FiChevronLeft />}
        mb={6}
        onClick={handleBack}
        colorScheme="blue"
        variant="outline"
      >
        Back to NTN List
      </Button>

      <Heading as="h1" size="lg" mb={6}>
        NTN Record Details
      </Heading>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        <GridItem>
          <Box bg={bgColor} p={6} borderRadius="md" boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
            <Heading as="h2" size="md" mb={4}>
              Customer Information
            </Heading>
            <VStack spacing={3} align="stretch">
              <Flex justify="space-between">
                <Text fontWeight="bold">Name:</Text>
                <Text>{`${filingData.user.firstName} ${filingData.user.lastName}`}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">CNIC:</Text>
                <Text>{filingData.user.cnic}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Email:</Text>
                <Text>{filingData.user.email}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Phone:</Text>
                <Text>{filingData.phone}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Telecom:</Text>
                <Text>{filingData.telecom}</Text>
              </Flex>
            </VStack>
          </Box>

          <Box bg={bgColor} p={6} borderRadius="md" boxShadow="sm" mt={6} borderWidth="1px" borderColor={borderColor}>
            <Heading as="h2" size="md" mb={4}>
              FBR Credentials
            </Heading>
            <VStack spacing={3} align="stretch">
              <Flex justify="space-between">
                <Text fontWeight="bold">FBR Username:</Text>
                <Text>{filingData.fbrCredentials.username}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">FBR Password:</Text>
                <Text>{filingData.fbrCredentials.password}</Text>
              </Flex>
            </VStack>
          </Box>
        </GridItem>

        <GridItem>
          <Box bg={bgColor} p={6} borderRadius="md" boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
            <Heading as="h2" size="md" mb={4}>
              Status Information
            </Heading>
            <VStack spacing={3} align="stretch">
              <Flex justify="space-between">
                <Text fontWeight="bold">Application Status:</Text>
                {renderStatusBadge(filingData.applicationStatus)}
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Invoice Status:</Text>
                {renderStatusBadge(filingData.invoiceStatus)}
              </Flex>
            </VStack>
          </Box>

          <Box bg={bgColor} p={6} borderRadius="md" boxShadow="sm" mt={6} borderWidth="1px" borderColor={borderColor}>
            <Heading as="h2" size="md" mb={4}>
              Documents
            </Heading>
            <VStack spacing={4} align="stretch">
              {filingData.cnicFrontUrl && (
                <Box>
                  <Text fontWeight="bold" color="gray.500" mb={2}>CNIC Front</Text>
                  <Box position="relative">
                    <Image 
                      src={filingData.cnicFrontUrl} 
                      alt="CNIC Front" 
                      maxH="200px"
                      objectFit="cover" 
                      borderRadius="md"
                    />
                  </Box>
                </Box>
              )}
              
              {filingData.cnicBackUrl && (
                <Box>
                  <Text fontWeight="bold" color="gray.500" mb={2}>CNIC Back</Text>
                  <Box position="relative">
                    <Image 
                      src={filingData.cnicBackUrl} 
                      alt="CNIC Back" 
                      maxH="200px"
                      objectFit="cover" 
                      borderRadius="md"
                    />
                  </Box>
                </Box>
              )}
              
              {filingData.receiptImageUrl && (
                <Box>
                  <Text fontWeight="bold" color="gray.500" mb={2}>Payment Receipt</Text>
                  <Box position="relative">
                    <Image 
                      src={filingData.receiptImageUrl} 
                      alt="Receipt" 
                      maxH="200px"
                      objectFit="cover" 
                      borderRadius="md"
                    />
                  </Box>
                </Box>
              )}
              
              {!filingData.cnicFrontUrl && !filingData.cnicBackUrl && !filingData.receiptImageUrl && (
                <Text color="gray.500">No documents available</Text>
              )}
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default ViewNTN; 