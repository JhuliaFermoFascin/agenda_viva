import React from 'react';
import { useRouter } from 'next/router';
import IconLogin from '../icon/icon-login.svg';

export default function EsqueceuSenha() {
    const router = useRouter();

    const handleBackToLogin = () => {
        router.push('/Login');
    };

    return (
        <div className="flex flex-row min-h-screen">
            <div className="bg-[#8ECAE6] w-[60%] flex items-center justify-center rounded-r-lg">
                <div className="flex flex-col items-center justify-center">
                    <IconLogin />
                </div>
            </div>
            <div className="flex w-full items-center justify-center">
                <div className="flex flex-col gap-6 w-full max-w-md">
                    <div className="bg-[#f5f5f5] p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-center mb-4 text-[#8ECAE6]">
                            Esqueceu sua senha?
                        </h1>
                        <p className="text-sm text-gray-600 mb-4 text-center">
                            Entre em contato com o SAC para redefinir sua senha.
                        </p>
                        <p className="text-sm text-[#FFB703] mb-4 text-center">
                            +55 (48) 9 9876-5432
                        </p>
                        <p className="text-sm text-[#FFB703] text-center">
                            agendaviva@sac.br
                        </p>
                    </div>
                    <div className="bg-[#f5f5f5] p-6 mt-10 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-center mb-4 text-[#8ECAE6]">
                            Horário de Atendimento
                        </h2>
                        <p className="text-sm text-gray-600 text-center">
                            Segunda a Sexta: 8h às 18h
                        </p>
                        <p className="text-sm text-gray-600 text-center">
                            Sábados: 8h às 12h
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleBackToLogin}
                            className="w-full bg-[#FFB703] text-white py-2 mt-10 rounded-lg hover:bg-[#6FB3CF] transition"
                        >
                            Voltar ao Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
