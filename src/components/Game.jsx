import React, { useState } from "react";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import { User } from "./User";
import { Card, Container, Row, Col } from 'react-bootstrap';
import { loginRequest } from '../authConfig';
import { callMsGraph } from '../graph';
import { ProfileData } from './ProfileData';
import { SignOutButton } from "./SignOutButton";

export const Game = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function RequestProfileData() {
        setIsLoading(true);
        try {
            const response = await instance.acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            });
            const data = await callMsGraph(response.accessToken);
            setGraphData(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <Card className="shadow-sm">
            <Card.Body className="text-center">
                <Card.Title className="mb-4">
                    <h4>Welcome, {accounts[0].name}! 👋</h4>
                </Card.Title>

                {graphData ? (
                    <ProfileData graphData={graphData} />
                ) : (
                    <Button
                        variant="primary"
                        onClick={RequestProfileData}
                        disabled={isLoading}
                        className="px-4 py-2"
                    >
                        {isLoading ? 'Loading...' : 'View Profile Information'}
                    </Button>
                )}
            </Card.Body>
        </Card>
        <SignOutButton />
        </>
    );
}