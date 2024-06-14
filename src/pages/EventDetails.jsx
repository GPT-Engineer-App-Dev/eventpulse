import { Box, Container, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvent } from "../integrations/supabase/index.js";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading } = useEvent(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Container maxW="container.md" p={4}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxW="container.md" p={4}>
        <Text>Event not found.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg">{event.title}</Heading>
        <Text><strong>Date:</strong> {event.date}</Text>
        <Text><strong>Description:</strong> {event.description}</Text>
        <Button mt={4} colorScheme="teal" onClick={() => navigate("/")}>Back to Events</Button>
      </VStack>
    </Container>
  );
};

export default EventDetails;