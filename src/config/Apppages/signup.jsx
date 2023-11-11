import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const toast = useToast();

  const handleSignup = () => {
    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters with the first letter capitalized.');
      return;
    }

    // Other signup logic
    axios
      .post('http://localhost:5000/auth/signup', {
        userName: userName.charAt(0).toUpperCase() + userName.slice(1), // Capitalize first letter
        password,
        contactNumber,
      })
      .then((response) => {
        // Handle successful signup
        navigate(`/`);
        console.log('Signup successful:', response.data);

        // Show a success toast notification
        toast({
          title: 'Signup Successful',
          description: 'Account created successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        // Clear signup inputs
        setUsername('');
        setPassword('');
        setContactNumber('');
      })
      .catch((error) => {
        // Handle signup error
        console.error('Signup error:', error.response ? error.response.data : error.message);

        // Show an error toast notification
        toast({
          title: 'Signup Error',
          description: 'Error creating an account. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt="10%"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      textAlign="center"
    >
      <Heading mb="6" fontSize="2xl">
        Sign Up
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

        <FormControl isInvalid={passwordError}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
            placeholder="Enter your password"
          />
          {passwordError && (
            <FormHelperText color="red.500">{passwordError}</FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Contact Number</FormLabel>
          <Input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter your contact number"
          />
        </FormControl>

        <Button colorScheme="teal" onClick={handleSignup}>
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
};

export default Signup;
