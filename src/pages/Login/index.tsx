import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/Firebase';
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Login successful, navigate to the desired page
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            // Handle login error
            toast({
                title: 'Login Failed',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Center h="100vh">
            <Box
                maxW="md"
                w="full"
                bg={useColorModeValue('white', 'gray.700')}
                rounded="lg"
                p={6}
                textAlign="center"
            >
                <Heading as="h2" size="xl" textAlign="center" mb={5}>
                    Login
                </Heading>
                <form onSubmit={handleLogin}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                            Sign in
                        </Button>
                    </Stack>
                </form>
                <Text mt={4}>
                    Don't have an account?{' '}
                    <Button variant="link" colorScheme="blue">
                        Sign up
                    </Button>
                </Text>
            </Box>
        </Center>
    );
};

export default LoginPage;