import React, { useState, useEffect } from "react";
import {
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  Badge,
  Text,
  Flex,
  Button,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import {
  FiChevronRight,
  FiSearch,
  FiEye,
  FiChevronLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BreadcrumbNav from "../../components/BreadcrumbNav";

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

function NTNList() {
  const [data, setData] = useState(ntnData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  // Calculate pagination
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Get current page data
  const getCurrentPageData = () => {
    let filteredData = data;

    // Apply search filter
    if (searchQuery) {
      filteredData = filteredData.filter(
        (item) =>
          `${item.user.firstName} ${item.user.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.user.cnic.includes(searchQuery)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filteredData = filteredData.filter(
        (item) => item.applicationStatus === statusFilter
      );
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize, searchQuery, statusFilter]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
  };

  // Handle view action
  const handleView = (id) => {
    navigate(`/ntn/view/${id}`);
  };

  // Function to render status badge with appropriate color
  const renderStatus = (status) => {
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
      default:
        colorScheme = "gray";
    }

    return (
      <Badge colorScheme={colorScheme} borderRadius="full" px={2}>
        {status}
      </Badge>
    );
  };

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max pages to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of page range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're at the beginning
      if (currentPage <= 2) {
        endPage = 4;
      }

      // Adjust if we're at the end
      if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box py={5}>
      <BreadcrumbNav />

      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h1" size="lg">
          NTN Records
        </Heading>
      </Flex>

      {/* Search and filter controls */}
      <Flex mb={6} direction={{ base: "column", md: "row" }} gap={2}>
        <InputGroup maxW={{ md: "320px" }}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search by name or CNIC"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          maxW={{ md: "200px" }}
        >
          <option value="all">All Statuses</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="working">Working</option>
          <option value="requested">Requested</option>
        </Select>
      </Flex>

      {/* Table */}
      <Box bg={bgColor} borderRadius="md" boxShadow="sm" overflow="hidden">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Customer Name</Th>
              <Th>CNIC</Th>
              <Th>Telecom</Th>
              <Th>Application Status</Th>
              <Th>Invoice Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getCurrentPageData().length > 0 ? (
              getCurrentPageData().map((item) => (
                <Tr key={item.id}>
                  <Td>{`${item.user.firstName} ${item.user.lastName}`}</Td>
                  <Td>{item.user.cnic}</Td>
                  <Td>{item.telecom}</Td>
                  <Td>{renderStatus(item.applicationStatus)}</Td>
                  <Td>{renderStatus(item.invoiceStatus)}</Td>
                  <Td>
                    <IconButton
                      aria-label="View NTN record"
                      icon={<FiEye />}
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => handleView(item.id)}
                    />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6}>
                  <Text textAlign="center" py={4}>
                    No records found
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>

        {/* Pagination Controls */}
        {data.length > 0 && (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mt={4}
            px={2}
            py={2}
          >
            <HStack>
              <Text fontSize="sm">Rows per page:</Text>
              <Select
                size="sm"
                width="70px"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Select>
            </HStack>

            <HStack spacing={2}>
              <IconButton
                icon={<FiChevronLeft />}
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
                aria-label="Previous page"
              />

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <Text key={`ellipsis-${index}`} mx={1}>
                    ...
                  </Text>
                ) : (
                  <Button
                    key={page}
                    size="sm"
                    variant={currentPage === page ? "solid" : "outline"}
                    colorScheme={currentPage === page ? "blue" : "gray"}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                )
              )}

              <IconButton
                icon={<FiChevronRight color="gray.300" />}
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
                aria-label="Next page"
              />
            </HStack>
          </Flex>
        )}
      </Box>
    </Box>
  );
}

export default NTNList; 