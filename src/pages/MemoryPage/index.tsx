import { Box, Heading } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import MemoriesBottomMenu from '../../components/MemoriesBottonMenu';
const MemoryPage = () => {
    return (
        <Box p={5} pb="75px"> {/* Padding bottom para não sobrepor o menu */}
            <Heading as="h1" size="md" mb={4}>Página de Memórias</Heading>
            <Outlet />  {/* Renderiza os componentes das sub-rotas */}
            <MemoriesBottomMenu />
        </Box>
    );
};

export default MemoryPage;
