import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';


const Login = () => {
  const navigate = useNavigate()
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        userName,
        password,
      });

      // Handle successful login
      navigate(`/courses`);
      console.log('Login successful:', response.data);

      // Show a success toast notification
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Clear login inputs
      setUsername('');
      setPassword('');
    } catch (error) {
      // Handle login error
      console.error('Login error:', error.response ? error.response.data : error.message);

      // Show an error toast notification
      toast({
        title: 'Login Error',
        description: 'Invalid username or password. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="lg"
      sx={{height:"500px",marginTop:"70px"}}
      mx="auto"
     
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      textAlign="center"
    >
      <Heading mb="6" fontSize="2xl">
       Login
      </Heading>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>

        <Button colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
