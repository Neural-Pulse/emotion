// src/pages/AfetivogramaPage.tsx
import React from 'react';
import TopBar from '../../components/TopBar';
import BottomMenu from '../../components/BottonMenu';
import SideBar from '../../components/SideBar';
import { Box } from '@chakra-ui/react';

interface AfetivogramaPageProps {
    onLogout: () => void;
    onOpenSidebar: () => void;
    onCloseSidebar: () => void;
    isSidebarOpen: boolean;
    githubUrl: string;
}

const AfetivogramaPage: React.FC<AfetivogramaPageProps> = ({ onLogout, onOpenSidebar, onCloseSidebar, isSidebarOpen, githubUrl }) => {
    return (
        <Box>
            <TopBar onLogout={onLogout} githubUrl={githubUrl} onOpen={onOpenSidebar} />
            <SideBar isOpen={isSidebarOpen} onClose={onCloseSidebar} />
            <BottomMenu />
        </Box>
    );
};

export default AfetivogramaPage;