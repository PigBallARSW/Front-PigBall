import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "react-bootstrap/Button";

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => {
            console.log(e);
        });
    }

    return (
        <Button
            variant="secondary"
            className="ml-auto"
            onClick={handleLogin}
        >
            Sign In
        </Button>
    )
}