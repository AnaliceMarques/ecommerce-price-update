import { useState } from "react";
import "./App.css";
import { Instruction } from "./components/Instruction";
import { Table } from "./components/Table";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const formData = new FormData();

  formData.append("file", file);

  const upload = async () => {
    try {
      const res = await axios.post("http://localhost:3003", formData);

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-items-center items-center gap-6">
      <h1 className="font-bold text-3xl mt-4">ATUALIZAÇÃO DE PREÇO</h1>
      <form onSubmit={upload}>
        <input
          type="file"
          accept=".csv"
          name="uploaded_file"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-sm pr-8"
        />
        <button
          type="submit"
          className="px-4 mx-6 border border-gray-500 rounded-sm bg-gray-200 hover:bg-gray-300"
        >
          VALIDAR
        </button>
      </form>
      <Table data={data} />
      <button className="px-4 border border-gray-500 rounded-sm bg-gray-200 hover:bg-gray-300">
        ATUALIZAR
      </button>
      <Instruction />
    </div>
  );
}

export default App;
