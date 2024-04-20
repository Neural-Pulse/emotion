// SideBar/index.tsx
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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
        <>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Navigation Menu</DrawerHeader>
                    <DrawerBody>
                        <Link to="/about" onClick={handleClose}>About</Link>
                        {/* Add more navigation links here, each wrapped with onClick={handleClose} */}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Sidebar;
