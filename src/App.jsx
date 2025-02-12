import React, { useState } from 'react';
import './styles/App.css';
import { PageLayout } from './components/PageLayout';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { ProfileData } from './components/ProfileData';
import { Game } from './components/Game';

// Componente para el botón de Microsoft
const MicrosoftLoginButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch(e => {
            console.error(e);
        });
    };

    return (
        <Button
            onClick={handleLogin}
            variant="light"
            className="d-flex align-items-center justify-content-center border shadow-sm"
            style={{
                width: '240px',
                margin: '0 auto',
                padding: '8px 16px'
            }}
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

const ProfileContent = () => {
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
    );
};

const MainContent = () => {
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <AuthenticatedTemplate>
                        <ProfileContent />
                    </AuthenticatedTemplate>

                    <UnauthenticatedTemplate>
                        <Card className="shadow-sm text-center">
                            <Card.Body>
                                <Card.Title>
                                    <h5>Welcome to Our App</h5>
                                </Card.Title>
                                <Card.Text className="text-muted">
                                    Please sign in to access your profile information.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <div className="text-center mt-4">
                            <MicrosoftLoginButton />
                        </div>
                    </UnauthenticatedTemplate>
                </Col>
            </Row>
        </Container>
    );
};

export default function App() {
    return (
        <PageLayout>
        </PageLayout>
        
    );
}