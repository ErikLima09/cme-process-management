import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';
import Materiais from './components/Materials';
import TrackMaterial from './components/TrackMaterial';
import Reports from './components/Reports';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/materials" element={<Materiais />} />
              <Route path="/track-materials" element={<TrackMaterial />} />
              <Route path="/reports" element={<Reports />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;