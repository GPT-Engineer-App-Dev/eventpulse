import { Box, Container, Heading, VStack, Text, HStack, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEvents, useDeleteEvent } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Index = () => {
  const { data: events, isLoading } = useEvents();
  const deleteEvent = useDeleteEvent();

  const { session, logout } = useSupabaseAuth();

  const handleDelete = async (id) => {
    await deleteEvent.mutateAsync(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxW="container.xl" p={4}>
      {/* Header */}
      <Box as="header" bg="blue.500" color="white" p={4} borderRadius="md">
        <HStack>
          <Heading as="h1" size="lg">Events Management</Heading>
          <Spacer />
          {session ? (
            <Button colorScheme="teal" variant="outline" onClick={logout}>Logout</Button>
          ) : (
            <Button as={Link} to="/login" colorScheme="teal" variant="outline">Login</Button>
          )}
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
          events.map((event) => (
            <Box as={Link} to={`/event/${event.id}`} key={event.id} w="100%" p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              <Heading as="h3" size="sm">{event.title}</Heading>
              <Text>{event.date}</Text>
              <Text>{event.description}</Text>
              <HStack mt={4}>
                <Button as={Link} to={`/edit/${event.id}`} colorScheme="teal" variant="outline" onClick={(e) => e.stopPropagation()}>Edit</Button>
                <Button colorScheme="red" variant="outline" onClick={(e) => { e.stopPropagation(); handleDelete(event.id); }}>Delete</Button>
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