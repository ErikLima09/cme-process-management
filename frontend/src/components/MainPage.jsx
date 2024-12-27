import React from 'react';
import { useNavigate } from 'react-router'; // Para navegação de páginas
import './MainPage.css';

const MainPage = () => {
    const navigate = useNavigate(); // Usado para redirecionar para outras páginas

    // Função para navegar para a página de cadastro de materiais
    const handleRegisterMaterial = () => {
        navigate('/cadastro-material'); // Redireciona para a página de cadastro
    };

    // Função para navegar para a página de rastreamento de material
    const handleTrackMaterial = () => {
        navigate('/rastrear-material'); // Redireciona para a página de rastreamento
    };

    // Função para navegar para a página de relatórios
    const handleGenerateReport = () => {
        navigate('/relatorios'); // Redireciona para a página de relatórios
    };

    return (
        <div className="main-container">
            <h1>Bem-vindo ao Sistema de Gerenciamento</h1>

            <div className="button-container">
                <button onClick={handleRegisterMaterial} className="main-button">
                    Cadastro de Materiais
                </button>
                <button onClick={handleTrackMaterial} className="main-button">
                    Rastrear Material
                </button>
                <button onClick={handleGenerateReport} className="main-button">
                    Emitir Relatórios
                </button>
            </div>
        </div>
    );
};

export default MainPage;
