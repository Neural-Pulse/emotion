import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, useDisclosure } from '@chakra-ui/react';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import EmotionMether from './pages/EmotionMether';
import Analytics from './pages/Analytics';
import BottomMenu from './components/BottonMenu';
import WelcomePage from './pages/Welcome';
import TopBar from './components/TopBar';
import AboutPage from './pages/About';
import Sidebar from './components/SideBar';
import { auth } from './utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setupNotifications } from './utils/push-notifications/notificationSetup';

const App = () => {
  const [user, loading] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!loading) {
      setupNotifications(); // Call setupNotifications when loading finishes
    }
  }, [loading]); // Dependency to re-run when the loading state changes

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleOpen = () => {
    console.log("handleOpen called: Attempting to open the sidebar.");
    onOpen();
  };

  const handleLogout = () => {
    auth.signOut(); // Logout implementation
  };

  const githubUrl = "https://github.com/Neural-Pulse/emotion";

  return (
    <Router>
      <TopBar onLogout={handleLogout} githubUrl={githubUrl} onOpen={handleOpen} />
      <Sidebar isOpen={isOpen} onClose={onClose} />
      {user ? (
        <>
          <Box pb="60px">
            <Routes>
              <Route path="/" element={<EmotionMether />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/about" element={<AboutPage />} />
              {/* Additional authenticated routes can be added here */}
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