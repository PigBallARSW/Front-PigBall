import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import Button from "@mui/material/Button";

/*
const handleLogin = async () => {
            instance.loginPopup(loginRequest).catch((e) => console.error(e));
    };
    */
export default function MicrosoftLoginButton() {
        return (
          <svg width="20" height="20" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
            <path fill="#f3f3f3" d="M0 0h23v23H0z" />
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
        )
      }
      