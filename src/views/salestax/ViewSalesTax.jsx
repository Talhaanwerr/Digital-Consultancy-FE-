import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { FiChevronLeft, FiDownload, FiFile } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadcrumbNav";
import { salesTaxData } from "../../utils/testData";

function ViewSalesTax() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filingData, setFilingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Simulated API call to fetch the Sales Tax filing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const record = salesTaxData.find((item) => item.id === parseInt(id));

        if (!record) {
          throw new Error("Sales Tax record not found");
        }

        setFilingData(record);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Sales Tax record:", err);
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
    navigate("/salestax");
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
          Back to Sales Tax List
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
        Back to Sales Tax List
      </Button>

      <Heading as="h1" size="lg" mb={6}>
        Sales Tax Record Details
      </Heading>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        <GridItem>
          <Box
            bg={bgColor}
            p={6}
            borderRadius="md"
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Heading as="h2" size="md" mb={4}>
              Tax Information
            </Heading>
            <VStack spacing={3} align="stretch">
              <Flex justify="space-between">
                <Text fontWeight="bold">Tax Year:</Text>
                <Text>{filingData.taxYear}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text fontWeight="bold">Tax Month:</Text>
                <Text>{filingData.taxMonth}</Text>
              </Flex>
            </VStack>
          </Box>

          <Box
            bg={bgColor}
            p={6}
            borderRadius="md"
            boxShadow="sm"
            mt={6}
            borderWidth="1px"
            borderColor={borderColor}
          >
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
          <Box
            bg={bgColor}
            p={6}
            borderRadius="md"
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
          >
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

          <Box
            bg={bgColor}
            p={6}
            borderRadius="md"
            boxShadow="sm"
            mt={6}
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Heading as="h2" size="md" mb={4}>
              Documents
            </Heading>

            {filingData.receiptImageUrl && (
              <Box mb={4}>
                <Text fontWeight="bold" color="gray.500" mb={2}>
                  Payment Receipt
                </Text>
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

            {filingData.saleInvoices && filingData.saleInvoices.length > 0 && (
              <Box mt={4}>
                <Text fontWeight="bold" color="gray.500" mb={2}>
                  Sale Invoices
                </Text>
                <VStack align="stretch" spacing={2}>
                  {filingData.saleInvoices.map((url, index) => (
                    <Flex
                      key={`sale-${index}`}
                      align="center"
                      p={2}
                      bg="gray.50"
                      borderRadius="md"
                      _dark={{ bg: "gray.700" }}
                    >
                      <Icon as={FiFile} mr={2} />
                      <Text flex="1" fontSize="sm" isTruncated>
                        Sale Invoice {index + 1}
                      </Text>
                      <IconButton
                        icon={<FiDownload />}
                        size="sm"
                        aria-label={`Download Sale Invoice ${index + 1}`}
                        onClick={() =>
                          handleDownload(url, `sale-invoice-${index + 1}.pdf`)
                        }
                      />
                    </Flex>
                  ))}
                </VStack>
              </Box>
            )}

            {filingData.exportInvoices &&
              filingData.exportInvoices.length > 0 && (
                <Box mt={4}>
                  <Text fontWeight="bold" color="gray.500" mb={2}>
                    Export Invoices
                  </Text>
                  <VStack align="stretch" spacing={2}>
                    {filingData.exportInvoices.map((url, index) => (
                      <Flex
                        key={`export-${index}`}
                        align="center"
                        p={2}
                        bg="gray.50"
                        borderRadius="md"
                        _dark={{ bg: "gray.700" }}
                      >
                        <Icon as={FiFile} mr={2} />
                        <Text flex="1" fontSize="sm" isTruncated>
                          Export Invoice {index + 1}
                        </Text>
                        <IconButton
                          icon={<FiDownload />}
                          size="sm"
                          aria-label={`Download Export Invoice ${index + 1}`}
                          onClick={() =>
                            handleDownload(
                              url,
                              `export-invoice-${index + 1}.pdf`
                            )
                          }
                        />
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              )}

            {!filingData.receiptImageUrl &&
              (!filingData.saleInvoices ||
                filingData.saleInvoices.length === 0) &&
              (!filingData.exportInvoices ||
                filingData.exportInvoices.length === 0) && (
                <Text color="gray.500">No documents available</Text>
              )}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default ViewSalesTax;
