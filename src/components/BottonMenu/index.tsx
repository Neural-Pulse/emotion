import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';

const BottomMenu = () => {
    const history = useNavigate();
    const location = useLocation();

    const isSelected = (path: string) => location.pathname === path;

    return (
        <Flex
            as="nav"
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            justifyContent="space-around"
            backgroundColor="#f8f9fa"
            padding="10px 0"
            zIndex="docked" // Garante que o menu fique acima de outros conteúdos
        >
            <Button
                onClick={() => history('/')}
                colorScheme={isSelected('/') ? 'blue' : 'gray'}
                variant={isSelected('/') ? 'solid' : 'ghost'}
                _hover={{ bg: 'blue.500', color: 'white' }}
            >
                Sentimentos
            </Button>
            <Button
                onClick={() => history('/analytics')}
                colorScheme={isSelected('/analytics') ? 'blue' : 'gray'}
                variant={isSelected('/analytics') ? 'solid' : 'ghost'}
                _hover={{ bg: 'blue.500', color: 'white' }}
            >
                Afetivograma
            </Button>
        </Flex>
    );
};

export default BottomMenu;