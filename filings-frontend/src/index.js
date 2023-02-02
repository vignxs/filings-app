import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "react-auth-kit";
import {ContextProvider} from './Context/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <SnackbarProvider>
        <AuthProvider
          authType="cookie"
          authName="_auth"
          cookieDomain={window.location.hostname}
          cookieSecure={false}
        >
          <App />
        </AuthProvider>
      </SnackbarProvider>
    </ContextProvider>
  </React.StrictMode>
);