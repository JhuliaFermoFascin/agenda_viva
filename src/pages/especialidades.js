import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

export default function Especialidades() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <>
            <Navbar />
            <Sidebar handleNavigation={handleNavigation} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    transition: 'margin-left 0.3s',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowX: 'hidden',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <h1 className="text-2xl font-bold mb-6 mt-20 ml-20 text-[#023047]">Cadastro de Especialidade</h1>
                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl place-self-center">
                    <div className="flex justify-between items-center mb-4">
                        <button className="bg-[#8ecae6] text-white px-6 py-2 rounded-lg hover:bg-[#77c5e9]">
                            + Especialidade
                        </button>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Pesquise por nome"
                                className="border border-gray-300 rounded-lg py-2 px-4 text-sm w-72"
                            />
                            <span className="absolute right-3 top-3 text-gray-400">
                                🔍
                            </span>
                        </div>
                    </div>
                    <table className="mt-10 w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-4 text-[#8ecae6] text-left">ID</th>
                                <th className="py-2 px-4 text-[#8ecae6] text-left">Especialidade</th>
                                <th className="py-2 px-4 text-[#8ecae6] text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(8)].map((_, index) => (
                                <tr key={index} className="hover:bg-gray-100 border-b">
                                    <td className="py-2 px-4 text-left">{index + 1}</td>
                                    <td className="py-2 px-4">Especialidade {index + 1}</td>
                                    <td className="py-2 px-4 text-right">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            ✏️
                                        </button>
                                        <button className="text-red-500 hover:text-red-700 ml-4">
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between items-center text-sm">
                        <span>Total de 8 registros</span>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300">
                                1
                            </button>
                            <button className="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300">
                                2
                            </button>
                            <button className="px-3 py-1 border rounded-md bg-gray-200 hover:bg-gray-300">
                                3
                            </button>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    );
}
