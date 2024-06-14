import { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAddEvent } from "../integrations/supabase/index.js";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const addEvent = useAddEvent();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { title, date, description };
    await addEvent.mutateAsync(newEvent);
    navigate("/");
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg">Create Event</Heading>
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
          <Button mt={4} colorScheme="teal" type="submit">Create</Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreateEvent;