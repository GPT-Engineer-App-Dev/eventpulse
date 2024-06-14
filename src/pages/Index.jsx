import { Box, Container, Heading, VStack, Text, HStack, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(events);
  }, []);

  const handleDelete = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  return (
    <Container maxW="container.xl" p={4}>
      {/* Header */}
      <Box as="header" bg="blue.500" color="white" p={4} borderRadius="md">
        <HStack>
          <Heading as="h1" size="lg">Events Management</Heading>
          <Spacer />
          <Button as={Link} to="/create" colorScheme="teal" variant="outline">Create Event</Button>
        </HStack>
      </Box>

      {/* Main Content */}
      <VStack spacing={8} mt={8}>
        <Heading as="h2" size="md">Upcoming Events</Heading>
        {events.length === 0 ? (
          <Box w="100%" p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
            <Text>No events available. Please check back later.</Text>
          </Box>
        ) : (
          events.map((event, index) => (
            <Box key={index} w="100%" p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              <Heading as="h3" size="sm">{event.title}</Heading>
              <Text>{event.date}</Text>
              <Text>{event.description}</Text>
              <HStack mt={4}>
                <Button as={Link} to={`/edit/${index}`} colorScheme="teal" variant="outline">Edit</Button>
                <Button colorScheme="red" variant="outline" onClick={() => handleDelete(index)}>Delete</Button>
              </HStack>
            </Box>
          ))
        )}
      </VStack>

      {/* Footer */}
      <Box as="footer" bg="gray.700" color="white" p={4} mt={8} borderRadius="md" textAlign="center">
        <Text>&copy; 2023 Events Management. All rights reserved.</Text>
      </Box>
    </Container>
  );
};

export default Index;