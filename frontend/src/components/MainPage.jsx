import React from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegação de páginas
import './CSS/MainPage.css';

const MainPage = () => {
    const navigate = useNavigate(); // Usado para redirecionar para outras páginas

    // Funções de navegação
    const handleNavigate = (path) => {
        navigate(path); // Redireciona para o caminho especificado
    };

    return (
        <div className="main-layout">
            <aside className="sidebar">
                <h2>Menu</h2>
                <ul className="sidebar-menu">
                    <li onClick={() => handleNavigate('/materials')}>Materiais</li>
                    <li onClick={() => handleNavigate('/track-materials')}>Rastrear Material</li>
                    <li onClick={() => handleNavigate('/reports')}>Emitir Relatórios</li>
                </ul>
            </aside>

            {/* Conteúdo Principal */}
            <main className="main-content">
                <h1>Bem-vindo ao Sistema de CME</h1>
                <p>Use o menu lateral para navegar pelas funcionalidades do sistema.</p>
            </main>
        </div>
    );
};

export default MainPage;
