import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import EmotionMether from './pages/EmotionMether';
import Analytics from './pages/Analytics';
import BottomMenu from './components/BottonMenu';
import WelcomePage from './pages/Welcome';
import TopBar from './components/TopBar'; // Importe o componente TopBar
import { auth } from './utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setupNotifications } from './utils/push-notifications/notificationSetup';

const App = () => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading) {
      setupNotifications(); // Chame setupNotifications quando o loading terminar
    }
  }, [loading]); // Dependência para re-executar quando o estado de loading mudar

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    auth.signOut(); // Implementação do logout
  };

  const githubUrl = "https://github.com/Neural-Pulse/emotion"; // Substitua pela URL do seu repositório

  return (
    <Router>
      <TopBar onLogout={handleLogout} githubUrl={githubUrl} />
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