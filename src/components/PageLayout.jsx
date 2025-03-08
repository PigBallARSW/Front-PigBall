/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { useEffect } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';
import '../styles/login.css';
import { MicrosoftLoginButton } from './MicrosoftLoginButton';
import { Game } from './Game';
import { Login } from './Login';
/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * 
 */
export const PageLayout = () => {
    const isAuthenticated = useIsAuthenticated();
    return (
        <>
            {isAuthenticated ? (<Game />) : (<Login />)}
        </>
    );
};
