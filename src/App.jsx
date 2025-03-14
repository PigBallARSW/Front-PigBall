import React, { useState } from 'react';
import './styles/App.css';
import { PageLayout } from './components/main/PageLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';

export default function App() {
    return (
    <BrowserRouter>
        <Routes>
              <Route path="/" element={<PageLayout />} />
              <Route path="/game" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
        
    );
}