import { Flex, Button, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { IconContext } from 'react-icons';

interface TopBarProps {
    onLogout: () => void;
    githubUrl: string;
}

const TopBar: React.FC<TopBarProps> = ({ onLogout, githubUrl }) => {
    const padding = useBreakpointValue({ base: 2, sm: 3, md: 4, lg: 5 });
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

    return (
        <Flex
            bg="gray.100"
            p={padding}
            boxShadow="sm"
            justify="flex-end"
            align="center"
            width="full"
        >
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
                onClick={() => window.open(githubUrl, '_blank')}
                colorScheme="teal"
                icon={
                    <IconContext.Provider value={{ size: '1.5em' }}>
                        <FaGithub />
                    </IconContext.Provider>
                }
            />
        </Flex>
    );
};

export default TopBar;