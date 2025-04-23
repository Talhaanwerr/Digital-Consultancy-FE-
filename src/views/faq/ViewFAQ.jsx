import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import BreadcrumbNav from '../../components/BreadcrumbNav';

// Mock data for FAQs - same as in FAQList.jsx and FAQForm.jsx
const initialFaqs = [
  {
    id: 1,
    question: 'What services do you offer?',
    answer: 'We offer a wide range of digital consultancy services including tax filing, business registration, and NTN modifications.'
  },
  {
    id: 2,
    question: 'How long does it take to register a business?',
    answer: 'Business registration typically takes 3-5 business days, depending on the type of business and documentation provided.'
  },
  {
    id: 3,
    question: 'What documents are required for tax filing?',
    answer: 'Required documents include financial statements, bank statements, receipts, and identification documents like CNIC.'
  },
  {
    id: 4,
    question: 'How can I track my application status?',
    answer: 'You can track your application status by logging into your account and navigating to the relevant section (e.g., Company Return Filing) where you submitted your application.'
  },
  {
    id: 5,
    question: 'What are your consultation fees?',
    answer: 'Our consultation fees vary based on the complexity of your requirements. Please contact our support team for a personalized quote.'
  }
];

function ViewFAQ() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [faqData, setFaqData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Fetch FAQ data
  useEffect(() => {
    // Simulate API call to fetch FAQ data
    setIsLoading(true);
    setTimeout(() => {
      const faqId = parseInt(id);
      const faq = initialFaqs.find(faq => faq.id === faqId);
      
      if (faq) {
        setFaqData(faq);
        setIsLoading(false);
      } else {
        setError('FAQ not found');
        setIsLoading(false);
      }
    }, 500); // Simulate network delay
  }, [id]);

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
        <Button mt={4} leftIcon={<FiArrowLeft />} onClick={() => navigate('/faqs')}>
          Back to FAQs
        </Button>
      </>
    );
  }

  return (
    <>
      <BreadcrumbNav 
        items={[
          { label: 'FAQ', path: '/faqs' },
          { label: 'View FAQ', path: '#', isCurrentPage: true }
        ]}
      />
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading>FAQ Details</Heading>
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
          <Heading size="md">Question</Heading>
          <Text>{faqData.question}</Text>
          
          <Divider my={2} />
          
          <Heading size="md">Answer</Heading>
          <Text whiteSpace="pre-wrap">{faqData.answer}</Text>
          
          <Divider />
          
          <Box pt={4}>
            <Button 
              leftIcon={<FiArrowLeft />}
              variant="outline" 
              onClick={() => navigate('/faqs')}
            >
              Back to FAQs
            </Button>
          </Box>
        </VStack>
      </Box>
    </>
  );
}

export default ViewFAQ; 