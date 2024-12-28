import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './CSS/Reports.css';

const GenerateReport = () => {
    const navigate = useNavigate();
    const [serialFilter, setSerialFilter] = useState('');
    const [trackingData, setTrackingData] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const handleSerialChange = async (e) => {
        setSerialFilter(e.target.value);
        if (e.target.value === '') {
            setTrackingData([]);
            setSelectedMaterial(null);
        } else {
            try {
                const response = await axios.get(`http://localhost:5000/api/processes/serial/${e.target.value}`);
                setTrackingData(response.data);
                setSelectedMaterial({ serial: e.target.value });
            } catch (error) {
                console.error('Erro ao buscar dados do serial:', error);
                alert('Erro ao buscar dados. Verifique o serial e tente novamente.');
            }
        }
    };

    const handleGeneratePDF = () => {
        if (trackingData.length === 0 || !selectedMaterial) {
            alert('Nenhum dado para gerar o relatório.');
            return;
        }

        const doc = new jsPDF();
        doc.text(`Relatório do Material - Serial: ${selectedMaterial.serial}`, 10, 10);

        const tableColumn = ['Id', 'Etapa', 'Data', 'Status', 'Serial'];
        const tableRows = trackingData.map((track) => [
            track.material_id,
            track.step,
            new Date(track.timestamp).toLocaleString(),
            track.status,
            selectedMaterial.serial,
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save(`Relatorio_Material_${selectedMaterial.serial}.pdf`);
    };

    return (
        <div className="report-page-container">
            <div className="sidebar-reports">
                <ul>
                    <li onClick={() => navigate('/materials')}>Materiais</li>
                    <li onClick={() => navigate('/track-materials')}>Rastrear Material</li>
                    <li onClick={() => navigate('/reports')}>Emitir Relatórios</li>
                </ul>
            </div>

            <div className="report-content">
                <h1>Emitir Relatórios</h1>

                <div className="search-section-reports">
                    <label htmlFor="serial-search">Pesquisar por Serial:</label>
                    <input
                        type="text"
                        id="serial-search"
                        value={serialFilter}
                        onChange={handleSerialChange}
                    />
                </div>

                {trackingData.length > 0 && (
                    <div className="tracking-details-reports">
                        <h2>Dados do Material - Serial: {selectedMaterial?.serial}</h2>
                        <table className="tracking-table-reports">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Etapa</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Serial</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trackingData.map((track, index) => (
                                    <tr key={index}>
                                        <td>{track.material_id}</td>
                                        <td>{track.step}</td>
                                        <td>{new Date(track.timestamp).toLocaleString()}</td>
                                        <td>{track.status}</td>
                                        <td>{selectedMaterial?.serial}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="button-reports" onClick={handleGeneratePDF}>Emitir Relatório em PDF</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateReport;
