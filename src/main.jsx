// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { LoginProvider } from './context/LoginContext';
import { UserProvider } from './context/UserData.jsx';

createRoot(document.getElementById('root')).render(
  <LoginProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </LoginProvider>
);
