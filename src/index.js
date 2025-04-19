import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import { UserProvider } from './context/user/userContext';
import { AlertProvider } from './context/alert/AlertContext';
import { AuthProvider } from './context/auth/AuthContext';
/**
 * Initialize a PublicClientApplication instance which is provided to the MsalProvider component
 * We recommend initializing this outside of your root component to ensure it is not re-initialized on re-renders
 */
const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
 */
root.render(
    <React.StrictMode>
                    
                    
        <MsalProvider instance={msalInstance}>
        <AuthProvider>
        <AlertProvider>
        <UserProvider>

            <App />
        </UserProvider>
        </AlertProvider>
        </AuthProvider>
        </MsalProvider>
        

    </React.StrictMode>
);
