import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading } from '@chakra-ui/react';
import { useSupabaseAuth, SupabaseAuthUI } from '../integrations/supabase/auth.jsx';

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <Container maxW="container.sm" p={4}>
      <Box textAlign="center" mb={6}>
        <Heading as="h2" size="xl">Login</Heading>
      </Box>
      <SupabaseAuthUI />
    </Container>
  );
};

export default Login;