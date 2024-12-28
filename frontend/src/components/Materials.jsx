import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importando ícones
import './CSS/Materials.css';

const MaterialListPage = () => {
    const navigate = useNavigate();
    const [materials, setMaterials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState(null);

    // Buscando os materiais da API
    const fetchMaterials = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/materials');
          setMaterials(response.data); // Armazena os dados no estado
        } catch (error) {
          console.error('Erro ao buscar os materiais:', error);
        }
      };

    useEffect(() => {
        fetchMaterials();
    }, []);

    // Função para abrir o modal
    const openModal = (materials = null) => {
        setEditingMaterial(materials);
        setIsModalOpen(true);
    };

    // Função para fechar o modal
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMaterial(null);
    };


    // Função para salvar novo material
    const handleSaveMaterial = async (e) => {
        e.preventDefault();
        
        const name = document.getElementById("register-name").value;
        const type = document.getElementById("register-type").value;
        const expiration_date = document.getElementById("register-expiration_date").value;
        
        try {   
            const endpoint = editingMaterial
                ? `http://localhost:5000/api/materials/${editingMaterial.id}`
                : 'http://localhost:5000/api/materials';
            const method = editingMaterial ? 'PUT' : 'POST';

            console.log(endpoint);

            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name, type, expiration_date})
            });

            const data = await response.json();

            if (response.ok) {
                alert(editingMaterial ? "Material atualizado com sucesso!" : "Material cadastrado com sucesso!");
                setIsModalOpen(false);
                window.location.reload()
            } else {
                alert(`Erro: ${data.message}`);
            }
        } catch (error) {
            console.error("Erro ao cadastrar o material:", error);
            alert("Erro ao cadastrar o material. Tente novamente.");
        } 
    };

    const handleDeleteMaterial = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este material?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/materials/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Material excluído com sucesso!");
                fetchMaterials();
            } else {
                alert("Erro ao excluir o material.");
            }
        } catch (error) {
            console.error("Erro ao excluir o material:", error);
            alert("Erro ao excluir o material. Tente novamente.");
        }
    };


    return (
        <div className="page-container">
            <div className="sidebar">
                <ul>
                    <li onClick={() => navigate('/materials')}>Materiais</li>
                    <li onClick={() => navigate('/track-materials')}>Rastrear Material</li>
                    <li onClick={() => navigate('/reports')}>Emitir Relatórios</li>
                </ul>
            </div>

            <div className="content">
                <h1>Lista de Materiais</h1>
                <button className="register-material-button" onClick={() => openModal()}> Cadastrar Novo Material </button>

                <table className="material-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Validade</th>
                            <th>Serial</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.length > 0 ? (
                            materials.map((material) => (
                                <tr key={material.id}>
                                    <td>{material.id}</td>
                                    <td>{material.name}</td>
                                    <td>{material.type}</td>
                                    <td>{material.expiration_date}</td>
                                    <td>{material.serial}</td>
                                    <td>{material.status}</td>
                                    <td>
                                        <FaEdit
                                            className="action-icon edit-icon"
                                            onClick={() => openModal(material)}
                                        />
                                        <FaTrash
                                            className="action-icon delete-icon"
                                            onClick={() => handleDeleteMaterial(material.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Nenhum material cadastrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-materials-overlay">
                    <div className="modal-materials-content">
                        <button className="close-modal-materials-icon" onClick={closeModal}>
                            ✕
                        </button>
                        <h2>{editingMaterial ? "Editar Material" : "Cadastrar Novo Material"}</h2>


                        <form onSubmit={handleSaveMaterial}>
                            <div>
                                <label htmlFor="register-name"> Material </label>
                                <input type="text" id="register-name" required defaultValue={editingMaterial?.name || ''} />
                            </div>

                            <div>
                                <label htmlFor="register-type"> Tipo </label>
                                <input type="text" id="register-type" required defaultValue={editingMaterial?.type || ''} />
                            </div>

                            <div>
                                <label htmlFor="register-expiration_date"> Data de Validade </label>
                                <input type="date" id="register-expiration_date" required defaultValue={editingMaterial?.expiration_date || ''} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button type="submit" className="register-button" onClick={handleSaveMaterial}> {editingMaterial ? "Salvar" : "Cadastrar"} </button>
                                <button type="button" className="close-modal-button" onClick={closeModal}> Cancelar </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
};

export default MaterialListPage;
