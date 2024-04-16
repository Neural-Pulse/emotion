import React from 'react';
import { Center, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <Center h="100vh">
            <VStack spacing={4}>
                <Button colorScheme="blue" as={Link} to="/login">
                    Login
                </Button>
                <Button colorScheme="teal" as={Link} to="/register">
                    Register
                </Button>
            </VStack>
        </Center>
    );
};

export default WelcomePage;