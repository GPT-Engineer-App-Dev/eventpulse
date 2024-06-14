import { Box, Container, Heading, VStack, Text, HStack, Spacer, Button } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container maxW="container.xl" p={4}>
      {/* Header */}
      <Box as="header" bg="blue.500" color="white" p={4} borderRadius="md">
        <HStack>
          <Heading as="h1" size="lg">Events Management</Heading>
          <Spacer />
          <Button colorScheme="teal" variant="outline">Login</Button>
        </HStack>
      </Box>

      {/* Main Content */}
      <VStack spacing={8} mt={8}>
        <Heading as="h2" size="md">Upcoming Events</Heading>
        <Box w="100%" p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
          <Text>No events available. Please check back later.</Text>
        </Box>
      </VStack>

      {/* Footer */}
      <Box as="footer" bg="gray.700" color="white" p={4} mt={8} borderRadius="md" textAlign="center">
        <Text>&copy; 2023 Events Management. All rights reserved.</Text>
      </Box>
    </Container>
  );
};

export default Index;