import React, { useState } from 'react';
import {
    Box,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Flex,
    Text,
    VStack,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useTheme,
} from '@chakra-ui/react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../utils/Firebase';

const FadeSelect = () => {
    const [sliderValue, setSliderValue] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const theme = useTheme();

    const handleChange = (value: React.SetStateAction<number>) => {
        setSliderValue(value);
    };

    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                const moodState = stageLabels[sliderValue];
                const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const docRef = await addDoc(collection(db, 'moodData'), {
                    userId: userId,
                    moodState: moodState,
                    time: timestamp,
                });
                console.log('Mood data saved with ID: ', docRef.id);
                setShowAlert(true);
            } else {
                console.log('User not authenticated');
            }
        } catch (error) {
            console.error('Error saving mood data: ', error);
        }
    };

    const stageLabels = [
        "Tristeza profunda/Lentidão/Apatia",
        "Tristeza/Fadiga/Cansaço/Desânimo",
        "Bom humor/Estabilidade",
        "Irritabilidade/Inquietação/Impaciência",
        "Euforia/Agitação/Aceleração/Agressividade"
    ];

    return (
        <Flex direction="column" align="center" justify="center" height="100vh">
            <Text mb="20px">Selecione o Estágio:</Text>
            <Flex>
                <VStack spacing={8} mr={4} align="stretch">
                    {stageLabels.map((label, index) => (
                        <Text key={index} color={sliderValue === (stageLabels.length - 1 - index) ? theme.colors.brand.coral : "gray.800"}>
                            {label}
                        </Text>
                    ))}
                </VStack>
                <Slider defaultValue={0} min={0} max={4} step={1} onChange={handleChange} orientation='vertical'>
                    <SliderTrack bg={theme.colors.brand.softYellow}>
                        <SliderFilledTrack bg={theme.colors.brand.mintGreen} />
                    </SliderTrack>
                    <SliderThumb boxSize={6} sx={{
                        bg: theme.colors.brand.lightBlue,
                        border: '2px solid white',
                        boxShadow: `0px 0px 0px 4px ${theme.colors.brand.lightBlue}`,
                        _hover: {
                            bg: theme.colors.brand.lightBlue,
                            boxShadow: `0px 0px 0px 4px ${theme.colors.brand.lightBlue}`,
                        },
                        _focus: {
                            boxShadow: `0px 0px 0px 4px ${theme.colors.brand.lightBlue}`,
                        }
                    }} />
                </Slider>
            </Flex>
            <Button colorScheme="blue" mt="4" onClick={handleSave}>Salvar</Button>

            {showAlert && (
                <Alert status="success" mt="4" borderRadius="md">
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Sucesso!</AlertTitle>
                        <AlertDescription>Os dados de humor foram salvos com sucesso.</AlertDescription>
                    </Box>
                </Alert>
            )}
        </Flex>
    );
};

export default FadeSelect;
