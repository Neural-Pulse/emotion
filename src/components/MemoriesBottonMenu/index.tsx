import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';

const MemoriesBottomMenu = () => {
    const navigate = useNavigate();
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
                onClick={() => navigate('/memories/chat')}
                colorScheme={isSelected('/memories/chat') ? 'blue' : 'gray'}
                variant={isSelected('/memories/chat') ? 'solid' : 'ghost'}
                _hover={{ bg: 'blue.500', color: 'white' }}
            >
                Chat
            </Button>
            <Button
                onClick={() => navigate('/memories/timeline')}
                colorScheme={isSelected('/memories/timeline') ? 'blue' : 'gray'}
                variant={isSelected('/memories/timeline') ? 'solid' : 'ghost'}
                _hover={{ bg: 'blue.500', color: 'white' }}
            >
                Time Line
            </Button>
        </Flex>
    );
};

export default MemoriesBottomMenu;
