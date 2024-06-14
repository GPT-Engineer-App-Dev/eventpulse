import { Box, Container, Heading, VStack, Text, HStack, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useJobs, useDeleteJob } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Jobs = () => {
  const { data: jobs, isLoading } = useJobs();
  const deleteJob = useDeleteJob();

  const { session, logout } = useSupabaseAuth();

  const handleDelete = async (id) => {
    await deleteJob.mutateAsync(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxW="container.xl" p={4}>
      {/* Header */}
      <Box as="header" bg="blue.500" color="white" p={4} borderRadius="md">
        <HStack>
          <Heading as="h1" size="lg">Jobs Management</Heading>
          <Spacer />
          {session ? (
            <Button colorScheme="teal" variant="outline" onClick={logout}>Logout</Button>
          ) : (
            <Button as={Link} to="/login" colorScheme="teal" variant="outline">Login</Button>
          )}
          {session && (
            <Button as={Link} to="/create-job" colorScheme="teal" variant="outline">Create Job</Button>
          )}
        </HStack>
      </Box>

      {/* Main Content */}
      <VStack spacing={8} mt={8}>
        <Heading as="h2" size="md">Available Jobs</Heading>
        {jobs.length === 0 ? (
          <Box w="100%" p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
            <Text>No jobs available. Please check back later.</Text>
          </Box>
        ) : (
          jobs.map((job) => (
            <Box as={Link} to={`/job/${job.id}`} key={job.id} w="100%" p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              <Heading as="h3" size="sm">{job.title}</Heading>
              <Text>{job.description}</Text>
              {session && (
                <HStack mt={4}>
                  <Button as={Link} to={`/edit-job/${job.id}`} colorScheme="teal" variant="outline" onClick={(e) => e.stopPropagation()}>Edit</Button>
                  <Button colorScheme="red" variant="outline" onClick={(e) => { e.stopPropagation(); handleDelete(job.id); }}>Delete</Button>
                </HStack>
              )}
            </Box>
          ))
        )}
      </VStack>

      {/* Footer */}
      <Box as="footer" bg="gray.700" color="white" p={4} mt={8} borderRadius="md" textAlign="center">
        <Text>&copy; 2023 Jobs Management. All rights reserved.</Text>
      </Box>
    </Container>
  );
};

export default Jobs;