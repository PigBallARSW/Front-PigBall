import React, { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/login.css';

export const MicrosoftLoginButton = () => {
    //const { instance } = useMsal();

    /*const handleLogin = () => {
        instance.loginPopup(loginRequest).catch(e => {
            console.error(e);
        });
    };*/

    return (
        <Button
            className="shadow-sm micro-button"
        >
            <svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#00A4EF"/>
                <rect x="1" y="11" width="9" height="9" fill="#7FBA00"/>
                <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
            </svg>
            <span className="ms-2">Sign in with Microsoft</span>
        </Button>
    );
};