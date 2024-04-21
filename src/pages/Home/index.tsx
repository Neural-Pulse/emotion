import { Button, Center, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Center height="100vh">
            <VStack spacing={4}>
                <Button colorScheme="blue" onClick={() => navigate('/afetivograma/emotionmether')}>
                    Afetivograma
                </Button>
                {/* Adicione mais botões para outras metodologias aqui */}
            </VStack>
        </Center>
    );
};

export default HomePage;