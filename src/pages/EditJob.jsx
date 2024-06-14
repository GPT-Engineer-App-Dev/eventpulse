import { useState, useEffect } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Heading } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useJob, useUpdateJob } from "../integrations/supabase/index.js";

const EditJob = () => {
  const { id } = useParams();
  const { data: job, isLoading } = useJob(id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const updateJob = useUpdateJob();

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedJob = { id, title, description };
    await updateJob.mutateAsync(updatedJob);
    navigate("/jobs");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg">Edit Job</Heading>
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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

export default EditJob;