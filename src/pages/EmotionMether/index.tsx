// src/pages/EmotionMether/index.tsx
import React from 'react';
import FadeSelect from "../../components/Fade";
import { Flex } from '@chakra-ui/react';

const EmotionMether = () => {
    return (
        <Flex height="100vh" align="center" justify="center">
            <FadeSelect />
        </Flex>
    );
};

export default EmotionMether;