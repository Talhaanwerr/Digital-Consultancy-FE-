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
  Link as ChakraLink,
  useColorModeValue,
  Icon,
  Image,
  IconButton
} from '@chakra-ui/react';
import { FiDownload, FiFileText } from 'react-icons/fi';
import { useNavigate, useParams, Link } from 'react-router-dom';
import BreadcrumbNav from '../../components/BreadcrumbNav';

const companyReturnFilingData = [
  {
    id: 1,
    taxYear: "2024",
    businessNature: "Sole Proprietor",
    businessType: "Private Limited",
    applicationStatus: "approved", // green
    invoiceStatus: "paid", // green
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    bankStatementPdfUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    financialStatementPdfUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
  },
  {
    id: 2,
    taxYear: "2024",
    businessNature: "Sole Proprietor",
    businessType: "Private Limited",
    applicationStatus: "rejected", // red
    invoiceStatus: "unpaid", // red
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    bankStatementPdfUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    financialStatementPdfUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
  },
  {
    id: 3,
    taxYear: "2024",
    businessNature: "Sole Proprietor",
    businessType: "Private Limited",
    applicationStatus: "working", // blue
    invoiceStatus: "unpaid", // red
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    bankStatementPdfUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    financialStatementPdfUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
  },
  {
    id: 4,
    taxYear: "2024",
    businessNature: "Sole Proprietor",
    businessType: "Private Limited",
    applicationStatus: "requested", // orange
    invoiceStatus: "unpaid", // red
    receiptImageUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    bankStatementPdfUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    financialStatementPdfUrl:
      "https://storage.googleapis.com/support-forums-api/attachment/thread-263408013-12838375264202129337.jpeg",
    user: {
      firstName: "Ali",
      lastName: "Khan",
      cnic: "1234567890123",
    },
  },
];

function ViewCompanyReturn() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filingData, setFilingData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Fetch filing data
  useEffect(() => {
    // Simulate API call to fetch filing data
    setIsLoading(true);
    setTimeout(() => {
      if (id >= 0 && id < companyReturnFilingData.length) {
        setFilingData(companyReturnFilingData[id - 1]);
        setIsLoading(false);
      } else {
        setError('Filing record not found');
        setIsLoading(false);
      }
    }, 500); // Simulate network delay
  }, [id]);

  // Function to handle PDF download
  const handleDownload = (url, filename) => {
    // In a real application, this would trigger a file download
    // For this example, we'll just log the action
    console.log(`Downloading ${filename} from ${url}`);
    
    // Create a temporary link to download the file
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to render status badge with appropriate color
  const renderStatus = (status) => {
    let colorScheme;
    
    switch(status.toLowerCase()) {
      case 'approved':
        colorScheme = 'green';
        break;
      case 'rejected':
        colorScheme = 'red';
        break;
      case 'working':
        colorScheme = 'blue';
        break;
      case 'requested':
        colorScheme = 'orange';
        break;
      default:
        colorScheme = 'gray';
    }
    
    return (
      <Badge colorScheme={colorScheme} borderRadius="full" px={2}>
        {status}
      </Badge>
    );
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
        <Button mt={4} onClick={() => navigate('/company-return-filing')}>
          Back to Company Return Filing
        </Button>
      </>
    );
  }

  return (
    <>
      <BreadcrumbNav 
        items={[
          { label: 'Company Return Filing', path: '/company-return-filing' },
          { label: `View Details`, path: "#" },
        ]}
      />
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading>Company Return Filing Details</Heading>
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
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold" color="gray.500">Tax Year</Text>
              <Text>{filingData.taxYear}</Text>
            </GridItem>
            
            <GridItem>
              <Text fontWeight="bold" color="gray.500">Business Nature</Text>
              <Text>{filingData.businessNature}</Text>
            </GridItem>
            
            <GridItem>
              <Text fontWeight="bold" color="gray.500">Business Type</Text>
              <Text>{filingData.businessType}</Text>
            </GridItem>
            
            <GridItem>
              <Text fontWeight="bold" color="gray.500">Application Status</Text>
              {renderStatus(filingData.applicationStatus)}
            </GridItem>

            <GridItem>
              <Text fontWeight="bold" color="gray.500">Invoice Status</Text>
              <Badge colorScheme={filingData.invoiceStatus === 'paid' ? 'green' : 'red'} borderRadius="full" px={2}>
                {filingData.invoiceStatus}
              </Badge>
            </GridItem>
          </Grid>
          
          <Divider my={2} />
          
          <Heading size="md" mt={2}>Documents</Heading>
          
          <Grid templateColumns="repeat(1, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold" color="gray.500">Receipt</Text>
              <Box mt={2}>
                <Image 
                  src={filingData.receiptImageUrl} 
                  alt="Receipt" 
                  maxH="200px" 
                  objectFit="cover" 
                  borderRadius="md"
                />
              </Box>
            </GridItem>
            
            <GridItem>
              <Text fontWeight="bold" color="gray.500">Bank Statement</Text>
              <HStack spacing={2} mt={2}>
                <Icon as={FiFileText} color="blue.500" boxSize={5} />
                <ChakraLink 
                  color="blue.500" 
                  onClick={() => handleDownload(filingData.bankStatementPdfUrl, 'bank_statement.pdf')}
                  cursor="pointer"
                >
                  Bank Statement.pdf
                </ChakraLink>
                <IconButton
                  icon={<FiDownload />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => handleDownload(filingData.bankStatementPdfUrl, 'bank_statement.pdf')}
                  aria-label="Download Bank Statement"
                />
              </HStack>
            </GridItem>
            
            <GridItem>
              <Text fontWeight="bold" color="gray.500">Financial Statement</Text>
              <HStack spacing={2} mt={2}>
                <Icon as={FiFileText} color="blue.500" boxSize={5} />
                <ChakraLink 
                  color="blue.500" 
                  onClick={() => handleDownload(filingData.financialStatementPdfUrl, 'financial_statement.pdf')}
                  cursor="pointer"
                >
                  Financial Statement.pdf
                </ChakraLink>
                <IconButton
                  icon={<FiDownload />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => handleDownload(filingData.financialStatementPdfUrl, 'financial_statement.pdf')}
                  aria-label="Download Financial Statement"
                />
              </HStack>
            </GridItem>
          </Grid>
          
          <Divider />
          
          <Box pt={4}>
            <Button 
              variant="outline" 
              onClick={() => navigate('/company-return-filing')}
            >
              Back to Company Return Filing
            </Button>
          </Box>
        </VStack>
      </Box>
    </>
  );
}

export default ViewCompanyReturn; 