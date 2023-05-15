import "./App.css";
import { Table } from "./components/Table";

function App() {
  return (
    <div className="flex flex-col justify-items-center items-center gap-6">
      <h1 className="font-bold text-3xl mt-4">ATUALIZAÇÃO DE PREÇO</h1>
      <form action="/stats" encType="multipart/form-data" method="post">
        <input type="file" accept=".csv" name="uploaded_file" />
        <button className="px-4 mx-6 border border-gray-500 rounded-sm bg-gray-200 hover:bg-gray-300">
          VALIDAR
        </button>
      </form>
      <Table />
      <button className="px-4 border border-gray-500 rounded-sm bg-gray-200 hover:bg-gray-300">
        ATUALIZAR
      </button>

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
    </div>
  );
}

export default App;
