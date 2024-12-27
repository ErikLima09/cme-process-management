import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';

const App = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
    );
};

export default App;