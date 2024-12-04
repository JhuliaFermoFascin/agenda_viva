import React from 'react';
import { useRouter } from 'next/router';

const ForgotPasswordPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/Login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Esqueceu sua senha?</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md text-center">
        <p className="text-gray-700 mb-4">
          Caso tenha esquecido sua senha, por favor, entre em contato com nosso suporte no email:
        </p>
        <h2 className="text-lg text-blue-500 font-bold">suporte@exemplo.com</h2>
      </div>

      <button
        onClick={handleGoBack}
        className="mt-6 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition duration-200"
      >
        Voltar para o Login
      </button>
    </div>
  );
};

export default ForgotPasswordPage;
