import FadeSelect from "../../components/Fade";
import { Flex, useTheme, Button, Box } from '@chakra-ui/react';
import { auth } from '../../utils/firebase';
import { signOut } from 'firebase/auth';

const EmotionMether = () => {
    const theme = useTheme();

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <Flex direction="column" height="100vh" bg={theme.colors.background.light}>
            <Box p={4} alignSelf="flex-end">
                <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
            </Box>
            <Flex flex={1} align="center" justify="center" mt={-10}> {/* Ajuste aqui */}
                <FadeSelect />
            </Flex>
        </Flex>
    );
};

export default EmotionMether;
