import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './CSS/TrackMaterial.css';

const MaterialTrackingPage = () => {
    const navigate = useNavigate();
    const [materials, setMaterials] = useState([]);
    const [trackingData, setTrackingData] = useState([]);
    const [serialFilter, setSerialFilter] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    // Buscando os materiais da API
    const fetchMaterials = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/materials');
            const materialsWithStatus = await Promise.all(
                response.data.map(async (material) => {
                    const trackingResponse = await axios.get(`http://localhost:5000/api/processes/${material.id}`);
                    const lastStatus = trackingResponse.data.length > 0 ? trackingResponse.data[trackingResponse.data.length - 1].status : material.status;
                    return { ...material, status: lastStatus };
                })
            );
            setMaterials(materialsWithStatus);
        } catch (error) {
            console.error('Erro ao buscar os materiais:', error);
        }
    };

    // Buscando o rastreamento de um material específico
    const fetchTrackingData = async (material_id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/processes/${material_id}`);
            setTrackingData(response.data);
        } catch (error) {
            console.error('Erro ao buscar rastreamento:', error);
        }
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    const handleSerialChange = (e) => {
        setSerialFilter(e.target.value);
        if (e.target.value === '') {
            setTrackingData([]);
        }
    };

    const handleTrackMaterial = (material) => {
        fetchTrackingData(material.id);
        setSelectedMaterial(material);
    };

    const handleUpdateStatus = async (material, step, status) => {
        try {
            // Atualizar o status do material
            await axios.put(`http://localhost:5000/api/materials/${material.id}`, { status });

            // Criar um registro na tabela Processes
            await axios.post('http://localhost:5000/api/processes', {
                step,
                status,
                timestamp: new Date().toISOString(),
                material_id: material.id,
            });

            // Atualiza os materiais na interface
            fetchMaterials();
            alert(`Material atualizado para o status: ${status}`);
        } catch (error) {
            console.error(`Erro ao atualizar o material para o status: ${status}`, error);
            alert('Erro ao processar a atualização do material.');
        }
    };

    return (
        <div className="tracking-page-container">
            <div className="sidebar">
                <ul>
                    <li onClick={() => navigate('/materials')}>Materiais</li>
                    <li onClick={() => navigate('/track-materials')}>Rastrear Material</li>
                    <li onClick={() => navigate('/reports')}>Emitir Relatórios</li>
                </ul>
            </div>

            <div className="tracking-content">
                <h1>Rastreamento de Materiais</h1>

                <div className="search-section">
                    <label htmlFor="serial-search">Pesquisar por Serial:</label>
                    <input
                        type="text"
                        id="serial-search"
                        value={serialFilter}
                        onChange={handleSerialChange}
                    />
                </div>

                <div className="material-list">
                    <h2>Materiais Cadastrados</h2>
                    <table className="material-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Tipo</th>
                                <th>Serial</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materials.filter(material => material.serial.includes(serialFilter)).map((material) => (
                                <tr key={material.id}>
                                    <td>{material.id}</td>
                                    <td>{material.name}</td>
                                    <td>{material.type}</td>
                                    <td>{material.serial}</td>
                                    <td>{material.status}</td>
                                    <td>
                                        <button onClick={() => handleUpdateStatus(material, 'Recebimento', 'Recebido')}>Recebido</button>
                                        <button onClick={() => handleUpdateStatus(material, 'Lavagem', 'Lavado')}>Lavagem</button>
                                        <button onClick={() => handleUpdateStatus(material, 'Esterilização', 'Esterilizado')}>Esterilização</button>
                                        <button onClick={() => handleUpdateStatus(material, 'Distribuição', 'Distribuído')}>Distribuição</button>
                                        <button onClick={() => handleTrackMaterial(material)}>Rastrear</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedMaterial && (
                    <div className="tracking-details">
                        <h2>Rastreamento do Material - Serial: {selectedMaterial.serial}</h2>
                        <table className="tracking-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Etapa</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trackingData.length > 0 ? (
                                    trackingData.map((track, index) => (
                                        <tr key={index}>
                                            <td>{track.material_id}</td>
                                            <td>{track.step}</td>
                                            <td>{track.timestamp}</td>
                                            <td>{track.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">Nenhum rastreamento encontrado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MaterialTrackingPage;
