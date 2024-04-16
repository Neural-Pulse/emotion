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
    useTheme
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const theme = useTheme();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/');
        } catch (error) {
            toast({
                title: 'Login Failed',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleNavigateToRegister = () => {
        navigate('/register');
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
                <Heading as="h2" size="xl" textAlign="center" mb={5} color={theme.colors.brand.mintGreen}>
                    Login
                </Heading>
                <form onSubmit={handleLogin}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
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
                            Entrar
                        </Button>
                    </Stack>
                </form>
                <Text mt={4}>
                    Ainda não possui cadastro?{' '}
                    <Button variant="link" colorScheme="blue" onClick={handleNavigateToRegister}>
                        Cadastrar
                    </Button>
                </Text>
            </Box>
        </Center>
    );
};

export default LoginPage;
