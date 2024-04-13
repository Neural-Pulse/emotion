import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import EmotionMether from './pages/EmotionMether';
import Analytics from './pages/Analytics';
import BottomMenu from '../src/components/BottonMenu'; // Ajuste o caminho conforme necessário

const App = () => {
  return (
    <Router>
      <Box pb="60px"> {/* Ajuste o valor conforme a altura do BottomMenu */}
        <Routes>
          <Route path="/" element={<EmotionMether />} />
          <Route path="/analytics" element={<Analytics />} />
          {/* Adicione outras rotas aqui conforme necessário */}
        </Routes>
      </Box>
      <BottomMenu /> {/* Isso fará com que BottomMenu seja exibido em todas as páginas */}
    </Router>
  );
};

export default App;