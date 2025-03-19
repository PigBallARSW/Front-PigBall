import React, { useState } from 'react';
import './styles/App.css';
import { PageLayout } from './components/main/PageLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import {MainGame} from './pages/game/MainGame';

export default function App() {
    return (
    <BrowserRouter>
        <Routes>
              <Route path="/" element={<PageLayout />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/game" element={<MainGame />} />
        </Routes>
    </BrowserRouter>
        
    );
}