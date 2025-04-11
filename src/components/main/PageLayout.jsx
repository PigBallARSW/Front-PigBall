/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import React from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { Login } from '../../pages/login/Login';
import { Main } from './Main';
/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * 
 */
export const PageLayout = () => {
    const isAuthenticated = useIsAuthenticated();
    
    return (
        <>
            {isAuthenticated ? (<Main />) : (<Login />)}
        </>
    );
};
