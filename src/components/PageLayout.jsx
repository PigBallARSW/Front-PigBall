/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';
import '../styles/login.css';
import { MicrosoftLoginButton } from './MicrosoftLoginButton';
/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * 
 */
export const PageLayout = () => {
    //const isAuthenticated = useIsAuthenticated();

    return (
        <div class="container-fluid vh-100 d-flex align-items-center justify-content-center login-container">
            <h1 class="field-title">PIGBALL</h1>
            <MicrosoftLoginButton />
            <div class="row w-100 h-100 m-0">
                <div class="col-md-6 text-white p-3 first field-login">
                    <div class="court court-left">
                        <div class="court-mini court-mini-left"></div>
                        <div class="field-player field-player-red" id="a"> </div>
                        <div class="field-player field-player-red" id="b"> </div>
                        <div class="field-player field-player-red" id="c"> </div>
                    </div>
                </div>
                <div class="col-md-6 text-white p-3 second field-login">
                <div class="court court-right">
                    <div class="court-mini court-mini-right"></div>
                    <div class="field-player field-player-blue" id="d"> </div>
                    <div class="field-player field-player-blue" id="e"> </div>
                    <div class="field-player field-player-blue" id="f"> </div>
                </div>
                </div>
            </div>
            <div class="field-circle"> </div>
        </div>

    );
};
