import React from 'react';
import FadeSelect from "../../components/Fade";
import { Flex, useTheme, Button, Box } from '@chakra-ui/react';
import { auth } from '../../utils/Firebase'; // Ensure this path is correct
import { signOut } from 'firebase/auth';

const EmotionMether = () => {
    const theme = useTheme(); // Use the hook useTheme to access the theme

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // Optionally, redirect the user to the login page or show a message
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <Flex direction="column" height="100vh" bg={theme.colors.background.light}>
            <Box p={4} alignSelf="flex-end">
                <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
            </Box>
            <Flex flex={1} align="center" justify="center">
                <FadeSelect />
            </Flex>
        </Flex>
    );
};

export default EmotionMether;
