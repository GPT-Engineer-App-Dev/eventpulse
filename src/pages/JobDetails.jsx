import { Box, Container, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useJob } from "../integrations/supabase/index.js";

const JobDetails = () => {
  const { id } = useParams();
  const { data: job, isLoading } = useJob(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Container maxW="container.md" p={4}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container maxW="container.md" p={4}>
        <Text>Job not found.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="lg">{job.title}</Heading>
        <Text><strong>Description:</strong> {job.description}</Text>
        <Button mt={4} colorScheme="teal" onClick={() => navigate("/jobs")}>Back to Jobs</Button>
      </VStack>
    </Container>
  );
};

export default JobDetails;