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
} from '@chakra-ui/react';

const FadeSelect = () => {
    const [sliderValue, setSliderValue] = useState(0);

    const handleChange = (value: React.SetStateAction<number>) => {
        setSliderValue(value);
    };

    const handleSave = () => {
        console.log(`Salvando o valor: ${sliderValue}`);
        // Aqui você pode adicionar a lógica para persistir o valor, como uma chamada de API.
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
                        <Text key={index} color={sliderValue === (stageLabels.length - 1 - index) ? "blue.500" : "gray.500"}>
                            {label}
                        </Text>
                    ))}
                </VStack>
                <Slider defaultValue={0} min={0} max={4} step={1} onChange={handleChange} orientation='vertical'>
                    <SliderTrack bg='red.100'>
                        <SliderFilledTrack bg='tomato' />
                    </SliderTrack>
                    <SliderThumb boxSize={6} sx={{
                        bg: 'blue.500', // Cor de fundo
                        border: '2px solid white', // Borda branca para destacar
                        boxShadow: '0px 0px 0px 4px rgba(66, 153, 225, 0.6)', // Sombra de foco/hover sempre visível
                        _hover: {
                            bg: 'blue.500', // Mantém a cor de fundo no hover
                            boxShadow: '0px 0px 0px 4px rgba(66, 153, 225, 0.6)', // Mantém a sombra de foco/hover no hover
                        },
                        _focus: { // Estilos para quando o thumb está focado (clicado)
                            boxShadow: '0px 0px 0px 4px rgba(66, 153, 225, 0.6)', // Mantém a sombra de foco/hover
                        }
                    }} />
                </Slider>
            </Flex>
            <Button colorScheme="blue" mt="4" onClick={handleSave}>Salvar</Button>
        </Flex>
    );
};

export default FadeSelect;