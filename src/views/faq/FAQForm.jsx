import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  useToast,
  useColorModeValue
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadcrumbNav from '../../components/BreadcrumbNav';

// Mock data for FAQs - same as in FAQList.jsx
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

function FAQForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });
  
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const isEditMode = id !== undefined;
  const bgColor = useColorModeValue('white', 'gray.800');
  
  // Fetch FAQ data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      // Simulate API call to fetch FAQ data
      setTimeout(() => {
        const faqId = parseInt(id);
        const faq = initialFaqs.find(faq => faq.id === faqId);
        
        if (faq) {
          setFormData({
            question: faq.question,
            answer: faq.answer
          });
          setIsLoading(false);
        } else {
          toast({
            title: 'Error',
            description: 'FAQ not found',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          navigate('/faqs');
        }
      }, 500); // Simulate network delay
    }
  }, [id, isEditMode, navigate, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    if (!formData.question || !formData.answer) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call to save/update FAQ
    setTimeout(() => {
      // In a real app, you would post to an API or update state in a parent component
      const actionText = isEditMode ? 'updated' : 'created';
      
      toast({
        title: 'Success',
        description: `FAQ ${actionText} successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      setIsSubmitting(false);
      navigate('/faqs');
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/faqs');
  };

  const breadcrumbItems = isEditMode
    ? [
        { label: 'FAQ', path: '/faqs' },
        { label: 'Edit FAQ', path: '#', isCurrentPage: true }
      ]
    : [
        { label: 'FAQ', path: '/faqs' },
        { label: 'Create FAQ', path: '#', isCurrentPage: true }
      ];

  return (
    <>
      <BreadcrumbNav items={breadcrumbItems} />
      
      <Heading mb={6}>{isEditMode ? 'Edit' : 'Create'} FAQ</Heading>
      
      <Box 
        bg={bgColor}
        p={6} 
        borderRadius="md" 
        boxShadow="sm"
        maxW="800px"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="flex-start">
            <FormControl isRequired>
              <FormLabel>Question</FormLabel>
              <Input 
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                placeholder="Enter FAQ question"
                isDisabled={isLoading}
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Answer</FormLabel>
              <Textarea 
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                placeholder="Enter FAQ answer"
                minH="150px"
                isDisabled={isLoading}
              />
            </FormControl>
            
            <HStack spacing={4} width="100%" pt={4}>
              <Button 
                colorScheme="blue" 
                type="submit"
                isLoading={isSubmitting || isLoading}
                loadingText={isSubmitting ? 'Saving' : 'Loading'}
              >
                {isEditMode ? 'Update' : 'Create'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                isDisabled={isSubmitting || isLoading}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </>
  );
}

export default FAQForm; 