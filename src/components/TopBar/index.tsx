import React from 'react';
import { Flex, Button, IconButton, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

interface TopBarProps {
    onLogout: () => void;
    githubUrl: string;
    onOpen: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onLogout, githubUrl, onOpen }) => {
    const padding = useBreakpointValue({ base: 2, sm: 3, md: 4, lg: 5 });
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

    return (
        <Flex
            bg="gray.100"
            p={padding}
            boxShadow="sm"
            justify="space-between"
            align="center"
            width="full"
        >
            <Button
                size={buttonSize}
                colorScheme="teal"
                onClick={onOpen} // Use the onOpen passed as a prop
                mr={2}
            >
                Open Menu
            </Button>
            <Flex flexGrow={1} justifyContent="flex-end">
                <Button
                    size={buttonSize}
                    colorScheme="teal"
                    onClick={onLogout}
                    mr={2}
                >
                    Logout
                </Button>
                <IconButton
                    aria-label="GitHub link"
                    icon={<FaGithub />}
                    size={buttonSize}
                    onClick={() => window.open(githubUrl, '_blank')}
                    colorScheme="teal"
                />
            </Flex>
        </Flex>
    );
};

export default TopBar;