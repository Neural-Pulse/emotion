import { Button, Center, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Center height="100vh">
            <VStack spacing={4}>
                <Alert status="warning" width="100%" borderRadius="md">
                    <AlertIcon />
                    <AlertTitle mr={2}>Aviso de Alpha Test!</AlertTitle>
                    <AlertDescription>
                        O Emotion não foi oficialmente lançado, estamos em versão alpha, por favor use o aplicativo com cautela pois pode haver perca de dados, recomendados o uso para demonstrações apenas.
                    </AlertDescription>
                </Alert>
                <Button colorScheme="blue" onClick={() => navigate('/afetivograma/emotionmether')}>
                    Afetivograma
                </Button>
                <Button colorScheme="blue" onClick={() => navigate('/memories')}>
                    Memórias
                </Button>
            </VStack>
        </Center>
    );
};

export default HomePage;