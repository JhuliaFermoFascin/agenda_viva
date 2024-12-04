import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import HealthProfessionalTable from '../components/tabelaProfisionais';
import { useRouter } from 'next/router';

export default function Alunos() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <>
      <Navbar />
      <Sidebar handleNavigation={handleNavigation} />
      <main className="flex flex-col items-center justify-center min-h-screen p-3 ml-40 transition-all duration-300">
        <div className="flex justify-center w-full p-2">
          <div className="w-4/5 max-w-screen-lg">
            <HealthProfessionalTable />
          </div>
        </div>
      </main>
    </>
  );
}
