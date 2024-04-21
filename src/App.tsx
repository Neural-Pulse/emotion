import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import EmotionMether from './pages/EmotionMether';
import Analytics from './pages/Analytics';
import HomePage from './pages/Home';  // Importe o novo componente HomePage
import TopBar from './components/TopBar';
import AboutPage from './pages/About';
import HowtoFillLCMSP from './pages/HowtoFillLCMSP';
import Sidebar from './components/SideBar';
import { auth } from './utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setupNotifications } from './utils/push-notifications/notificationSetup';
import LcmspLayout from './components/lcmsp';
import MemoryPage from './pages/MemoryPage';
import MemoryChat from './components/MemoryChat';
import TimeLinePage from './pages/MemoriesTimeLine';

const App = () => {
  const [user, loading] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!loading) {
      setupNotifications();
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleOpen = () => {
    onOpen();
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const githubUrl = "https://github.com/Neural-Pulse/emotion";

  return (
    <Router>
      <TopBar onLogout={handleLogout} githubUrl={githubUrl} onOpen={handleOpen} />
      <Sidebar isOpen={isOpen} onClose={onClose} />
      {user ? (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/afetivograma" element={<LcmspLayout />}>
              <Route path="emotionmether" element={<EmotionMether />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="howto" element={<HowtoFillLCMSP />} />
            </Route>
            <Route path="/memories" element={<MemoryPage />}>
              <Route index element={<MemoryChat />} />
              <Route path="chat" element={<MemoryChat />} />
              <Route path="timeline" element={<TimeLinePage />} />
            </Route>
            {/* Adicione outras rotas conforme necessário */}
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
