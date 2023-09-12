import Input from "./components/Input/Input";
import Content from "./components/Content/Content.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import './App.css'


function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8081");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <div className="App">
        <Input onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Content setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      </div>
    </>
  );
}

export default App;
