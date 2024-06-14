import { useState, useEffect } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Heading } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvent, useUpdateEvent } from "../integrations/supabase/index.js";

const EditEvent = () => {
  const { id } = useParams();
  const { data: event, isLoading } = useEvent(id);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const updateEvent = useUpdateEvent();

  useEffect(() => {
    
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setDescription(event.description);
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = { title, date, description };
    await updateEvent.mutateAsync(updatedEvent);
    navigate("/");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg">Edit Event</Heading>
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl id="date" isRequired>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">Update</Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default EditEvent;