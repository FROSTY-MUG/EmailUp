import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import ConnectGmailPage from './pages/ConnectGmailPage';
import InboxPage from './pages/InboxPage';

export default function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage('connect');
  };

  const handleConnected = () => {
    setPage('inbox');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  switch (page) {
    case 'login':
      return <LoginPage onLogin={handleLogin} />;
    case 'connect':
      return <ConnectGmailPage user={user} onConnected={handleConnected} />;
    case 'inbox':
      return <InboxPage user={user} onLogout={handleLogout} />;
    default:
      return <LoginPage onLogin={handleLogin} />;
  }
}
