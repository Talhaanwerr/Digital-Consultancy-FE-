import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Flex,
  useColorModeValue,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react';
import { FiEye, FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import BreadcrumbNav from '../../components/BreadcrumbNav';

// Mock data for FAQs
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

function FAQList() {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const cancelRef = React.useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleView = (id) => {
    navigate(`/faqs/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/faqs/edit/${id}`);
  };

  const handleCreate = () => {
    navigate('/faqs/new');
  };

  const handleDelete = (id) => {
    setFaqToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Simulate API call to delete FAQ
    setTimeout(() => {
      setFaqs(faqs.filter(faq => faq.id !== faqToDelete));
      
      toast({
        title: 'FAQ Deleted',
        description: 'The FAQ has been deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      setIsDeleteDialogOpen(false);
    }, 500);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setFaqToDelete(null);
  };

  return (
    <>
      <BreadcrumbNav 
        items={[
          { label: 'FAQ', path: '#', isCurrentPage: true }
        ]}
      />
      
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h1" size="lg">Frequently Asked Questions</Heading>
        <Button 
          leftIcon={<FiPlus />} 
          colorScheme="blue"
          onClick={handleCreate}
        >
          Create FAQ
        </Button>
      </Flex>

      <VStack spacing={4} align="stretch">
        {faqs.map((faq, index) => (
          <Box 
            key={faq.id}
            p={5}
            bg={bgColor}
            borderRadius="md"
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Flex justifyContent="space-between" alignItems="flex-start">
              <VStack align="stretch" spacing={2} flex="1">
                <Text fontWeight="bold" fontSize="lg">
                  Q{index + 1}. {faq.question}
                </Text>
                <Text color="gray.600">
                  <Text as="span" fontWeight="medium">Answer: </Text>
                  {faq.answer.length > 150 
                    ? `${faq.answer.substring(0, 150)}...` 
                    : faq.answer}
                </Text>
              </VStack>
              <HStack spacing={2} ml={4}>
                <Button
                  leftIcon={<FiEye />}
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => handleView(faq.id)}
                >
                  View
                </Button>
                <Button
                  leftIcon={<FiEdit />}
                  size="sm"
                  colorScheme="green"
                  variant="outline"
                  onClick={() => handleEdit(faq.id)}
                >
                  Edit
                </Button>
                <Button
                  leftIcon={<FiTrash2 />}
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={() => handleDelete(faq.id)}
                >
                  Delete
                </Button>
              </HStack>
            </Flex>
          </Box>
        ))}
      </VStack>

      {/* Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={cancelDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete FAQ
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this FAQ? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={cancelDelete}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default FAQList; 