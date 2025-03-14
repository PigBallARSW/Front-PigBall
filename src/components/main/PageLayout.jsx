/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { useEffect } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { Login } from '../../pages/login/Login';
import HomePage from '../../pages/homepage/HomePage';
/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * 
 */
export const PageLayout = () => {
    const isAuthenticated = useIsAuthenticated();
    return (
        <>
            {isAuthenticated ? (<HomePage />) : (<Login />)}
        </>
    );
};
