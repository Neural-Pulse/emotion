import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register'; // Ensure you have this component
import EmotionMether from './pages/EmotionMether';
import Analytics from './pages/Analytics';
import BottomMenu from './components/BottonMenu';
import WelcomePage from './pages/Welcome'; // Import WelcomePage
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
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Redirect all other paths to WelcomePage */}
          <Route path="*" element={<WelcomePage />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
