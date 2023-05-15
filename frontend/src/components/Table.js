import React from "react";

export const Table = () => {
  return (
    <>
      <table className="table-fixed border-collapse border border-slate-400">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-500">CÓDIGO</th>
            <th className="border border-gray-500 px-40">NOME</th>
            <th className="border border-gray-500 px-2">PREÇO ATUAL</th>
            <th className="border border-gray-500 px-2">NOVO PREÇO</th>
            <th className="border border-gray-500 px-32">OBSERVAÇÃO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center px-1 border border-gray-500">
              Código do produto
            </td>
            <td className="text-start px-1 border border-gray-500 ">
              Nome do produto
            </td>
            <td className="text-center px-1  border border-gray-500">
              Preço atual
            </td>
            <td className="text-center px-1  border border-gray-500">
              Novo preço
            </td>
            <td className="text-start text-red-500 px-1 border border-gray-500">
              Mensagem de erro
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
