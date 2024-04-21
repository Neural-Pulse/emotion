import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import BottomMenu from '../BottonMenu';

const LcmspLayout = () => {
    return (
        <>
            <Box pb="60px">
                <Outlet />  {/* Este componente renderizará os componentes filhos correspondentes às rotas aninhadas */}
            </Box>
            <BottomMenu />
        </>
    );
};

export default LcmspLayout;
