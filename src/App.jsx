import React  from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import {MainGame} from './pages/game/MainGame';
import { Lobby } from './pages/lobby/Lobby';
import { Main } from './components/main/Main';
import { Login } from './pages/login/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import CustomPlayer from './components/homepage/CustomPlayer';
import {Friends} from './pages/friends/Friends';
import { UsernameInput } from './components/login/UsernameInput';

export default function App() {

    return (
            <>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/game/:id" element={<MainGame />} />
                        <Route path="/homepage" element={<Main />}>
                            <Route index element={<HomePage />} />
                            <Route path="lobby" element={<Lobby />} />
                            <Route path="custom" element={<CustomPlayer />} />
                            <Route path="addfriends" element = {<Friends/>}/>
                        </Route>
                    </Route>
                </Routes>
            </>
    );
}