import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Box from "@mui/material/Box";
import IconPesquisar from "../icon/icon-pesquisar.svg";
import IconEditar from "../icon/icon-editar.svg";
import IconDeletar from "../icon/icon-deletar.svg";
import IconVoltar from "../icon/icon-voltar.svg";
import IconAvancar from "../icon/icon-avancar.svg";

export default function Especialidades() {
  const especialidades = [
    { id: 1, nome: "Fisioterapeuta" },
    { id: 2, nome: "Pedagogo (a)" },
    { id: 3, nome: "Neurologista" },
    { id: 4, nome: "Assistente social" },
    { id: 5, nome: "Enfermeiro" },
    { id: 6, nome: "Agente comunitário de saúde" },
    { id: 7, nome: "Pediatra" },
    { id: 8, nome: "Oftalmologista" },
  ];

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin-left 0.3s",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h1 className="text-2xl font-bold mb-6 mt-20 ml-20 text-[#023047]">
          Cadastro de Especialidade
        </h1>
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
              <button className="absolute right-3 top-2 text-gray-400">
                <IconPesquisar />
              </button>
            </div>
          </div>
          <table className="mt-10 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-4 border-[#EEEEEE]">
                <th className="py-2 px-4 text-[#8ecae6] text-left">ID</th>
                <th className="py-2 px-4 text-[#8ecae6] text-left">
                  Especialidade
                </th>
                <th className="py-2 px-4 text-[#8ecae6] text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {especialidades.map((especialidade) => (
                <tr
                  key={especialidade.id}
                  className="hover:bg-gray-100 border-b-2 border-[#EEEEEE]"
                >
                  <td className="py-2 px-4 text-left">{especialidade.id}</td>
                  <td className="py-2 px-4">{especialidade.nome}</td>
                  <td className="py-2 px-4 text-right">
                    <button>
                      <IconEditar />
                    </button>
                    <button className="ml-2">
                      <IconDeletar />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center text-sm">
            <span className="text-[#B5B7C0]">
              Total de {especialidades.length} registros
            </span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-[#EEEEEE] rounded-md bg-[#F5F5F5] hover:bg-gray-300">
                <IconVoltar />
              </button>
              <button className="px-3 py-1 border border-[#EEEEEE] rounded-md bg-[#F5F5F5] hover:bg-gray-300">
                1
              </button>
              <button className="px-3 py-1 border border-[#EEEEEE] rounded-md bg-[#F5F5F5] hover:bg-gray-300">
                2
              </button>
              <button className="px-3 py-1 border border-[#EEEEEE] rounded-md bg-[#F5F5F5] hover:bg-gray-300">
                3
              </button>
              <button className="px-3 py-1 border border-[#EEEEEE] rounded-md bg-[#F5F5F5] hover:bg-gray-300">
                <IconAvancar />
              </button>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
