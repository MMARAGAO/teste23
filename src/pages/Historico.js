import React, { useState } from "react";
import Header from "../components/Header";

const Historico = () => {
    const [data, setData] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [searchName, setSearchName] = useState('');
    const [portsAndCameras, setPortsAndCameras] = useState({});
    const [loading, setLoading] = useState(false);

    const options = [
        "S4 porta 2",
        "S3 porta 2",
        "S2 porta 2",
        "S1 porta 1 (Dispara Alarme CFTV) - Cozinha",
        "S1 porta 2 (Dispara Alarme CFTV) - Escada",
        "S1 porta 3 (Dispara Alarme CFTV) - Corredor",
        "Térreo porta 1",
        "Térreo porta 2",
        "Porta 3º Andar",
        "Porta 4º Andar",
        "Porta 17º Andar",
        "Porta 13º Andar",
        "Porta 14º Andar",
        "Porta 16º Andar",
        "Porta 18º Andar (Dispara Alarme CFTV)",
        "Heliponto (Dispara Alarme CFTV)",
        "Camera 1",
        "Camera 2"
    ];

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(`http://10.19.1.232:3000/api/history?date=${searchDate}&name=${searchName}`);
        const data = await response.json();
        setData(data);

        const portsAndCamerasData = {};
        for (const item of data) {
            if (!portsAndCamerasData[item.id_ports_fk]) {
                const portOrCameraResponse = await fetch(`http://10.19.1.232:3000/api/port-or-camera/${item.id_ports_fk}`);
                const name = await portOrCameraResponse.text();
                portsAndCamerasData[item.id_ports_fk] = name;
            }
        }
        setPortsAndCameras(portsAndCamerasData);
        setLoading(false);
    };

    const handleSearch = () => {
        fetchData();
    };

    return (
        <div className="dark:bg-gray-900 min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow lg:px-20 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Histórico</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <input
                        type="date"
                        value={searchDate}
                        onChange={e => setSearchDate(e.target.value)}
                        placeholder="Pesquisar por Last Update"
                        className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <select
                        value={searchName}
                        onChange={e => setSearchName(e.target.value)}
                        className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">Selecione um Nome do Porto ou Câmera</option>
                        {options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleSearch}
                        className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4-4m0 0a7 7 0 1110 10 7 7 0 01-10-10z" />
                        </svg>
                    </button>
                </div>
                {loading ? (
                    <p className="text-gray-900 dark:text-white">Carregando...</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Update</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Alarme</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {portsAndCameras[item.id_ports_fk] || "Carregando..."}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.last_update}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.alarme}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Historico;
