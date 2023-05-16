import React from "react";

export const Instruction = () => {
  return (
    <div>
      <p className="font-bold">Instruções:</p>
      <ul className="list-decimal">
        <li>
          Insira um arquivo no formato .csv contendo o código do produto que
          será atualizado o preço e o novo preço;
        </li>
        <li>
          Clique em VALIDAR para verificar se as informações recebidas atendem
          as regras do programa;
        </li>
        <li>
          Verifique se na coluna OBSERVAÇÃO apareceu alguma mensagem de erro.
          Caso exista, resolva os problemas informados e repita os passos
          anteriores;
        </li>
        <li>Clique em ATUALIZAR para atualizar os preços.</li>
      </ul>
    </div>
  );
};
