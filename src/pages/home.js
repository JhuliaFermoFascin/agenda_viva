import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { useRouter } from 'next/router';

import SchoolIcon from '@mui/icons-material/School';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BadgeIcon from '@mui/icons-material/Badge';

export default function Home() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path); 
  };

  return (
    <>
      <Navbar />
      <Sidebar handleNavigation={handleNavigation} />
      <main className="flex items-center justify-center h-screen p-3 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 w-full max-w-6xl">
          <div
            className="cursor-pointer text-center bg-gray-100 hover:bg-gray-200 p-6 rounded-lg shadow-md"
            onClick={() => handleNavigation('/alunos')}
          >
            <div className="text-yellow-500 text-6xl">
              <SchoolIcon fontSize="inherit" />
            </div>
            <h6 className="mt-4 text-lg font-medium">Alunos</h6>
          </div>
          <div
            className="cursor-pointer text-center bg-gray-100 hover:bg-gray-200 p-6 rounded-lg shadow-md"
            onClick={() => handleNavigation('/agendamento')}
          >
            <div className="text-yellow-500 text-6xl">
              <EventNoteIcon fontSize="inherit" />
            </div>
            <h6 className="mt-4 text-lg font-medium">Agendamentos</h6>
          </div>
          <div
            className="cursor-pointer text-center bg-gray-100 hover:bg-gray-200 p-6 rounded-lg shadow-md"
            onClick={() => handleNavigation('/profissionais')}
          >
            <div className="text-yellow-500 text-6xl">
              <BadgeIcon fontSize="inherit" />
            </div>
            <h6 className="mt-4 text-lg font-medium">Profissionais</h6>
          </div>
        </div>
      </main>
    </>
  );
}
