import FadeSelect from "../../components/Fade";
import { Flex, useTheme, Box } from '@chakra-ui/react';

const EmotionMether = () => {
    const theme = useTheme();



    return (
        <Flex direction="column" height="100vh" bg={theme.colors.background.light}>
            <Box p={4} alignSelf="flex-end">
            </Box>
            <Flex flex={1} align="center" justify="center" mt={-10}> {/* Ajuste aqui */}
                <FadeSelect />
            </Flex>
        </Flex>
    );
};

export default EmotionMether;
