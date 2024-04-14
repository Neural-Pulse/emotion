import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import LoginPage from './pages/Login';
import EmotionMether from './pages/EmotionMether';
import Analytics from './pages/Analytics';
import BottomMenu from '../src/components/BottonMenu';
import { auth } from './utils/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {user ? (
        <>
          <Box pb="60px">
            <Routes>
              <Route path="/" element={<EmotionMether />} />
              <Route path="/analytics" element={<Analytics />} />
              {/* Add other routes here as needed */}
            </Routes>
          </Box>
          <BottomMenu />
        </>
      ) : (
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;