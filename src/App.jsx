import React from 'react';
import './styles/App.css';
import { PageLayout } from './components/main/PageLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import {MainGame} from './pages/game/MainGame';
import { Lobby } from './pages/lobby/Lobby';
import { Main } from './components/main/Main';
import { AlertProvider } from './context/alert/AlertContext';
import { Login } from './pages/login/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';

export default function App() {
    return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/game/:id" element={
                    <MainGame />} />
                <Route path="/homepage" element={<Main />}>
                    <Route index element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
                    <Route path="lobby" element={<Lobby />} />
                </Route>
            </Routes>
    </BrowserRouter>
    );
}