import React, { useEffect, useState } from 'react';

function CombinedTable() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [videoSrc1, setVideoSrc1] = useState('http://10.19.1.232:5000/video_feed1');
    const [videoSrc2, setVideoSrc2] = useState('http://10.19.1.232:5000/video_feed2');
    const [isActive,] = useState(true);
    const [camera1Status, setCamera1Status] = useState(null);
    const [camera2Status, setCamera2Status] = useState(null);
    const [doubleClick, setDoubleClick] = useState(false);
    const [doubleClick2, setDoubleClick2] = useState(false);


    const ClickAlarm1 = () => {
        if (doubleClick) {
            setDoubleClick(false);
        }
        else {
            setDoubleClick(true);
        }
    }

    const ClickAlarm2 = () => {
        if (doubleClick2) {
            setDoubleClick2(false);
        }
        else {
            setDoubleClick2(true);
        }
    }





    useEffect(() => {
        let intervalId;

        if (camera1Status === 'Aberto' || camera2Status === 'Aberto') {
            intervalId = setInterval(() => {
                if (camera1Status === 'Aberto') {
                    setVideoSrc1(`http://10.19.1.232:5000/video_feed1?${new Date().getTime()}`);
                }
                if (camera2Status === 'Aberto') {
                    setVideoSrc2(`http://10.19.1.232:5000/video_feed2?${new Date().getTime()}`);
                }
            }, 2000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [camera1Status, camera2Status]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePort = await fetch('http://10.19.1.232:3000/api/port');
                const responseCam = await fetch('http://10.19.1.232:3000/api/cam');

                if (!responsePort.ok || !responseCam.ok) {
                    throw new Error(`HTTP error! status: ${responsePort.status}, ${responseCam.status}`);
                }

                const dataPort = await responsePort.json();
                const dataCam = await responseCam.json();

                const combinedData = [...dataPort, ...dataCam];
                setData(combinedData);

                const camera1 = combinedData.find(item => item.nome_camera === 'Camera 1');
                const camera2 = combinedData.find(item => item.nome_camera === 'Camera 2');
                if (camera1) {
                    setCamera1Status(camera1.status === 1 ? 'Aberto' : 'Fechado');
                }
                if (camera2) {
                    setCamera2Status(camera2.status === 1 ? 'Aberto' : 'Fechado');
                }
            } catch (err) {
                console.error(err);
                setError(err.toString());
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 2000);

        return () => clearInterval(intervalId);
    }, []);

    async function handleAlarmeClick(id_port) {
        try {
            const response = await fetch(`http://10.19.1.232:3000/api/port/${id_port}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ alarme: '0' }),
            });

            if (!response.ok) {
                throw new Error('Erro ao desativar o alarme');
            }

            setData(data.map(item => item.id_port === id_port ? { ...item, alarme: '0' } : item));
        } catch (error) {
            console.error(error);
        }
    }

    async function handleAlarmeClickCam(id) {
        try {
            const response = await fetch(`http://10.19.1.232:3000/api/cam/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ alarme: '0' }),
            });

            if (!response.ok) {
                throw new Error('Erro ao desativar o alarme');
            }

            setData(data.map(item => item.id === id ? { ...item, alarme: '0' } : item));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="overflow-x-auto lg:w-2/3">
                    {data && (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="dark:bg-gray-700 bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium dark:text-white uppercase tracking-wider text-center rounded-tl-xl">
                                        Nome
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium dark:text-white uppercase tracking-wider text-center">
                                        Status
                                    </th>
                                    <th scope="col" className="hidden lg:block px-6 py-3 text-left text-xs font-medium dark:text-white uppercase tracking-wider text-center rounded-tr-xl">
                                        Última Atualização
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((item, index) => (
                                    <tr key={index} className={`${((item.nome_camera && item.status === 1) || (item.nome_porta && item.status === 0)) ? 'bg-red-500 text-white font-bold' : 'dark:text-white dark:bg-gray-800'}`}>
                                        <td className="px-6 py-1 2xl:py-2 whitespace-nowrap">
                                            {item.nome_camera || item.nome_porta}
                                        </td>
                                        <td className="px-6 py-1 2xl:py-2 whitespace-nowrap text-center">
                                            {item.nome_camera ? (item.status === 1 ? 'Aberto' : 'Fechado') : (item.status === 1 ? 'Fechado' : 'Aberto')}
                                        </td>
                                        <td className="px-6 hidden lg:block py-1 2xl:py-2 whitespace-nowrap text-center">
                                            {item.last_update}
                                        </td>
                                        {item.alarme === '1' && (
                                            <div className="fixed z-10 inset-0 overflow-y-auto">
                                                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                                    </div>
                                                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                            <div className="sm:flex sm:items-start">
                                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                                        Alarme Ativado
                                                                    </h3>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500">
                                                                            O alarme para {item.nome_porta} foi ativado.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                            <button
                                                                type="button"
                                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                                onClick={() => handleAlarmeClick(item.id_port)}
                                                            >
                                                                Desativar Alarme
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {item.alarme === 1 && (
                                            <div className="fixed z-10 inset-0 overflow-y-auto">
                                                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                                    </div>
                                                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                            <div className="sm:flex sm:items-start">
                                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                                        Alarme Ativado
                                                                    </h3>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500">
                                                                            O alarme para {item.nome_camera} foi ativado.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                            <button
                                                                type="button"
                                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                                onClick={() => handleAlarmeClickCam(item.id)}
                                                            >
                                                                Desativar Alarme
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="w-full lg:w-1/3 px-6 py-6 bg-gray-100 rounded-xl dark:bg-gray-800 shadow-inner mt-6 lg:mt-0">
                    {isActive ? (
                        <div

                            className="flex flex-col">
                            {camera1Status === 'Aberto' && <img onDoubleClick={ClickAlarm1} src={videoSrc1} className={`cursor-pointer rounded-xl mb-6 w-full ${doubleClick ? 'absolute top-0 left-0 w-full h-screen' : ''}`} alt="Camera 1 feed" />}
                            {camera2Status === 'Aberto' && <img onDoubleClick={ClickAlarm2} src={videoSrc2} className={`cursor-pointer rounded-xl  w-full  ${doubleClick2 ? 'absolute top-0 left-0 w-full h-screen' : ''}`} alt="Camera 2 feed" />}
                        </div>
                    ) : (
                        <div className="text-center">
                            <p>Nenhuma câmera ativa no momento</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CombinedTable;
