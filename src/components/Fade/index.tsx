import React, { useState, useEffect } from 'react';
import { Flex, Text, VStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button, useTheme, Alert, AlertIcon, AlertTitle, AlertDescription, Box } from '@chakra-ui/react';
import { doc, setDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase'
import { encryptData } from '../../utils/crypto';

const FadeSelect = () => {
    const [sliderValue, setSliderValue] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const theme = useTheme();

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isButtonDisabled) {
            interval = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(interval);
                        setIsButtonDisabled(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => interval && clearInterval(interval);
    }, [isButtonDisabled]);

    const handleChange = (value: React.SetStateAction<number>) => {
        setSliderValue(value);
    };

    const handleSave = async () => {
        if (isButtonDisabled) return;

        setIsButtonDisabled(true);
        setTimeRemaining(180);

        try {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                const moodState = stageLabels[stageLabels.length - 1 - sliderValue];
                const timestamp = new Date().toISOString();

                const encryptedMoodData = encryptData({
                    moodState: moodState,
                    time: timestamp,
                });

                // Usa a variável de ambiente para determinar a coleção
                const collectionName = import.meta.env.VITE_FIREBASE_COLLECTION;
                const userMoodDataPath = doc(collection(db, `${collectionName}/${userId}/moodData`));

                await setDoc(userMoodDataPath, {
                    data: encryptedMoodData
                });
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            } else {
            }
        } catch (error) {
            console.error('Error saving mood data: ', error);
            setIsButtonDisabled(false);
        }
    };

    const stageLabels = [
        "Euforia/Agitação/Aceleração/Agressividade",
        "Irritabilidade/Inquietação/Impaciência",
        "Bom humor/Estabilidade",
        "Tristeza/Fadiga/Cansaço/Desânimo",
        "Tristeza profunda/Lentidão/Apatia",
    ];

    return (
        <Flex direction="column" align="center" justify="center" height="100vh">
            <Text mb="40px" fontSize={30}>Selecione o Estágio:</Text>
            <Flex>
                <VStack spacing={8} mr={4} align="stretch">
                    {stageLabels.map((label, index) => (
                        <Text key={index} fontSize={12} color={sliderValue === (stageLabels.length - 1 - index) ? theme.colors.brand.mintGreen : "gray.800"}>
                            {label}
                        </Text>
                    ))}
                </VStack>
                <Slider defaultValue={0} min={0} max={stageLabels.length - 1} step={1} onChange={handleChange} orientation='vertical'>
                    <SliderTrack bg={theme.colors.brand.softYellow}>
                        <SliderFilledTrack bg={theme.colors.brand.mintGreen} />
                    </SliderTrack>
                    <SliderThumb boxSize={6} sx={{
                        bg: theme.colors.brand.lightBlue,
                        border: '2px solid white',
                        boxShadow: `0px 0px 0px 4px ${theme.colors.brand.lightBlue}`,
                    }} />
                </Slider>
            </Flex>
            <Button colorScheme="blue" mt="4" onClick={handleSave} isDisabled={isButtonDisabled}>Salvar</Button>
            {isButtonDisabled && (
                <Text mt={2}>
                    Você pode registrar uma nova emoção em: {timeRemaining} segundos
                </Text>
            )}
            {showAlert && (
                <Alert status="success" mt="4" borderRadius="md">
                    <AlertIcon />
                    <Box flex="1">
                        <AlertTitle>Sucesso!</AlertTitle>
                        <AlertDescription>Os dados de humor foram salvos com sucesso.</AlertDescription>
                    </Box>
                </Alert>
            )}
        </Flex>
    );
};

export default FadeSelect;