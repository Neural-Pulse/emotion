import React from 'react';
import FadeSelect from "../../components/Fade";
import { Flex, useTheme } from '@chakra-ui/react';

const EmotionMether = () => {
    const theme = useTheme(); // Use o hook useTheme para acessar o tema

    return (
        <Flex height="100vh" align="center" justify="center" bg={theme.colors.background.light}>
            <FadeSelect />
        </Flex>
    );
};

export default EmotionMether;
