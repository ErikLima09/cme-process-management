import React, { useState } from 'react';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router';
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const setUser = useStore((state) => state.setUser);
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setUser(data.user); // Salva o usuário no Zustand
            navigate('/main');
        } else {
            setError(data.message); // Exibe mensagem de erro
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        
        const username = document.getElementById("register-user").value;
        const role = document.getElementById("register-role").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        console.log(username);
        console.log(role);
        console.log(email);
        console.log(password)

        try {            
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({ username, role, email, password})
            });

            const data = await response.json();

            if (response.ok) {
                alert("Usuário cadastrado com sucesso!");
                setIsModalOpen(false);
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            console.error("Erro ao cadastrar o usuário:", error);
            alert("Erro ao cadastrar o usuário. Tente novamente.");
        } 
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-text">{error}</p>}
                <button type="submit" className="login-button">Entrar</button>
            </form>

            <h3 className="no-account-text">Não possui cadastro?</h3>
            <button className="create-user-button" onClick={handleOpenModal}>
                Criar Usuário
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-modal-icon" onClick={handleCloseModal}>
                            ✕
                        </button>
                        <h2>Criar Usuário</h2>
                        <form onSubmit={handleRegisterSubmit}>
                            <div>
                                <label htmlFor="register-user"> Nome de usuário </label>
                                <input type="text" id="register-user" required />
                            </div>

                            <div>
                                <label htmlFor="register-role"> Função </label>
                                <input type="text" id="register-role" required />
                            </div>

                            <div>
                                <label htmlFor="register-email"> Email </label>
                                <input type="email" id="register-email" required />
                            </div>

                            <div>
                                <label htmlFor="register-password"> Senha </label>
                                <input type="password" id="register-password" required />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button type="submit" className="register-button"> Cadastrar </button>
                                <button type="button" className="close-modal-button" onClick={handleCloseModal}> Cancelar </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
