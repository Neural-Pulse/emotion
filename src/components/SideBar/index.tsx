import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Link
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const handleClose = () => {
        console.log("Closing sidebar after navigation.");
        onClose();
    };

    return (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Afetivograma
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Link as={RouterLink} to="/afetivograma/emotionmether" onClick={handleClose}>Sentimento</Link>
                                <br />
                                <Link as={RouterLink} to="/afetivograma/analytics" onClick={handleClose}>Afetivograma</Link>
                                <br />
                                <Link as={RouterLink} to="/afetivograma/howto" onClick={handleClose}>Como Preencher</Link>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    <Link as={RouterLink} to="/about" onClick={handleClose}>Sobre</Link>
                    {/* Add more navigation links here, each wrapped with onClick={handleClose} */}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default Sidebar;
