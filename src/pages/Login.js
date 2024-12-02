import Head from 'next/head';
import { useRouter } from 'next/router';
import IconLogin from '../icon/icon-login.svg';
import React, { useState, useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = () => {
    const validEmail = 'adm.agendaViva@gmail.com';
    const validPassword = 'adm.agenda';

    if (email === validEmail && password === validPassword) {
      setError('');

      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }

      router.push('/home');
    } else {
      setError('Email ou senha inválidos!');
    }
  };

  const handleForgotPassword = () => {
    router.push('/esqueceuSenha'); // Redireciona para a página de "Esqueceu Senha"
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-row min-h-screen">
        <div className="bg-[#8ECAE6] w-[60%] flex items-center justify-center rounded-r-lg">
          <div className="flex flex-col items-center justify-center">
            <IconLogin />
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="formulario-login w-[40rem]">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECAE6]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECAE6]"
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2 ml-2">{error}</p>
                )}
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-[#8ECAE6] border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                    Lembrar meu usuário
                  </label>
                </div>
                <div className="text-right mt-1">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-[#8ECAE6] hover:underline"
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-10">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full bg-[#FFB703] text-white py-2 rounded-lg hover:bg-[#6FB3CF] transition"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
