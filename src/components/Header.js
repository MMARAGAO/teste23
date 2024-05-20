import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

import { FaPhone, FaEnvelope, FaUser } from 'react-icons/fa';


const Header = () => {
    const [clickContact, setClickContact] = useState(false);
    useEffect(() => {
        console.log(clickContact);
    }
        , [clickContact]);

    return (
        <div>
            <header className="flex justify-between items-center px-5 lg:px-10 py-8">
                <div className="flex justify-center items-center space-x-4">
                    <img src={Logo} alt="Logo" className="w-10 h-10" />
                    <h1 className="lg:text-3xl text-sm text-gray-900 dark:text-white">Global Advising</h1>
                </div>
                <nav>
                    <ul className="flex space-x-10">
                        <li>
                            <a href="/" className="font-bold cursor-pointer text-sm lg:text-lg text-gray-900 dark:text-white hover:text-gray-400 dark:hover:text-gray-300">Home</a>
                        </li>
                        <li>
                            <Link to="/historico" className="font-bold cursor-pointer text-sm lg:text-lg text-gray-900 dark:text-white hover:text-gray-400 dark:hover:text-gray-300">Histórico</Link>
                        </li>
                        <li>
                            <a onClick={
                                () => {
                                    setClickContact(!clickContact);
                                }
                            } className="font-bold cursor-pointer text-sm lg:text-lg text-gray-900 dark:text-white hover:text-gray-400 dark:hover:text-gray-300">Contact</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className={`dark:bg-gray-900 rounded-bl-xl dark:text-white fixed h-screen right-0 bg-white p-8 shadow-lg w-80 ${clickContact ? "block" : "hidden"}`}>
                <h1 className="text-center font-bold text-2xl mb-6 border-b pb-2 border-gray-300 dark:border-gray-700">Contato</h1>
                <div className="mb-6">
                    <h2 className="font-semibold text-xl mb-4">Informações de Contato</h2>
                    <div className="flex items-center mb-2">
                        <FaPhone className="mr-2 text-gray-600 dark:text-gray-400" />
                        <p className="text-lg">Ramal: 9366</p>
                    </div>

                </div>
                <hr className="my-4 border-gray-300 dark:border-gray-700" />
                <div className="mb-6">
                    <h2 className="font-semibold text-xl mb-4">Desenvolvedores</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="flex items-center mb-2">
                                <FaUser className="mr-2 text-gray-600 dark:text-gray-400" />
                                <span className="text-lg">Matheus Mendes</span>
                            </h3>
                            <div className="flex items-center mb-2">
                                <FaEnvelope className="mr-2 text-gray-600 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">matheus@gaadvising.com</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <FaPhone className="mr-2 text-gray-600 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">61 9 8292-8478</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Função: Desenvolvedor Full-Stack</p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="flex items-center mb-2">
                                <FaUser className="mr-2 text-gray-600 dark:text-gray-400" />
                                <span className="text-lg">Lucas Morais</span>
                            </h3>
                            <div className="flex items-center mb-2">
                                <FaEnvelope className="mr-2 text-gray-600 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">lucas.morais@gaadvising.com</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <FaPhone className="mr-2 text-gray-600 dark:text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">62 9 9497-1149</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Função: Engenheiro Eletricista</p>
                        </div>
                    </div>
                </div>
                <hr className="my-4 border-gray-300 dark:border-gray-700" />
                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 Seu Projeto. Todos os direitos reservados.</p>
                </div>
            </div>
        </div>
    );
}

export default Header;