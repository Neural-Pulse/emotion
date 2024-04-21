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
            zIndex="docked"
        >
            <Button
                onClick={() => history('/afetivograma/emotionmether')}
                colorScheme={isSelected('/afetivograma/emotionmether') ? 'blue' : 'gray'}
                variant={isSelected('/afetivograma/emotionmether') ? 'solid' : 'ghost'}
                _hover={{ bg: 'blue.500', color: 'white' }}
            >
                Sentimentos
            </Button>
            <Button
                onClick={() => history('/afetivograma/analytics')}
                colorScheme={isSelected('/afetivograma/analytics') ? 'blue' : 'gray'}
                variant={isSelected('/afetivograma/analytics') ? 'solid' : 'ghost'}
                _hover={{ bg: 'blue.500', color: 'white' }}
            >
                Afetivograma
            </Button>
        </Flex>
    );
};

export default BottomMenu;