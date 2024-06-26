import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './components/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UserProvider>
  <React.StrictMode><GoogleOAuthProvider clientId="1939564990-6qvkcvi9jc0s11okocp1vgjujd3ttagr.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode></UserProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
