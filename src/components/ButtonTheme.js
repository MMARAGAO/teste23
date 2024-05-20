import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'

const ButtonTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    function toggleDarkMode() {
        const body = document.querySelector('body');
        body.classList.toggle('dark');
        const darkMode = body.classList.contains('dark');
        // Armazena o estado atual no localStorage
        localStorage.setItem('darkMode', darkMode);
        // Atualiza o estado do dark mode
        setIsDarkMode(darkMode);
    }

    // Carrega o estado do dark mode do localStorage quando o componente é montado
    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        const body = document.querySelector('body');
        if (darkMode) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
        setIsDarkMode(darkMode);
    }, []);

    return (
        <button
            onClick={toggleDarkMode}
            className={`fixed flex justify-center items-center bottom-5 right-5 p-4 rounded-full transition-transform duration-300 shadow-lg 
                    ${isDarkMode ? 'text-gray-700 bg-gradient-to-r from-yellow-300 to-yellow-500 border-none hover:from-yellow-200 hover:to-yellow-400' : 'text-yellow-500 bg-gradient-to-r from-gray-900 to-gray-700 border-none hover:from-gray-700 hover:to-gray-600'}
                    hover:scale-110 hover:shadow-2xl transform hover:-translate-y-1`}
        >
            <FontAwesomeIcon className="w-6 h-6" icon={isDarkMode ? faSun : faMoon} />
        </button>
    );
}

export default ButtonTheme;