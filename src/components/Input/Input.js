import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import style from '../Input/Input.module.css';

// IMG
import add from '../img/add.png';
import user from '../img/user.png';
import uf from '../img/uf.png';
import imgLogo from '../img/imgLogo.png';
import rua from '../img/rua.png';
import state from '../img/state.png';
import bio from '../img/bio.png';
import bairro from '../img/bairro.png';

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.nome.value = onEdit.nome;
      user.idade.value = onEdit.idade;
      user.rua.value = onEdit.rua;
      user.bairro.value = onEdit.bairro;
      user.estado.value = onEdit.estado;
      user.biografia.value = onEdit.biografia;
      // Não inicialize o campo de arquivo
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = ref.current;
    if (
      !user.nome.value ||
      !user.idade.value ||
      !user.rua.value ||
      !user.bairro.value ||
      !user.estado.value ||
      !user.biografia.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const formData = new FormData();
    formData.append("nome", user.nome.value);
    formData.append("idade", user.idade.value);
    formData.append("rua", user.rua.value);
    formData.append("bairro", user.bairro.value);
    formData.append("estado", user.estado.value);
    formData.append("biografia", user.biografia.value);
    if (user.imagem.files[0]) {
      formData.append("imagem", user.imagem.files[0]);
    } else if (onEdit) {
      formData.append("imagem", onEdit.imagem);
    }

    if (onEdit) {
      await axios
        .put(`http://localhost:8081/${onEdit.id}`, formData)
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8081", formData)
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.idade.value = "";
    user.rua.value = "";
    user.bairro.value = "";
    user.estado.value = "";
    user.biografia.value = "";
    user.imagem.value = "";

    setOnEdit(null);
    getUsers();
    setTexto('');
  };

  const [texto, setTexto] = useState('');

  const handleInputChange = (e) => {
    const valorInput = e.target.value;
    const valorEmMaiusculas = valorInput.toUpperCase();
    setTexto(valorEmMaiusculas);
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <form ref={ref} onSubmit={handleSubmit} className={style.form}>
          <div className={style.title}>
            <img src={add} alt="image0" className={style.add} />
            <h1 className={style.h1}><span className={style.fff}>U</span>suários</h1>
          </div>
          <div className={style.firstDiv}>
            <div className={style.nome}>
              <img src={user} alt="image2" className={style.icon} />
              <input name="nome" placeholder="Nome" className={style.first} maxLength={20} />
            </div>
            <div className={style.uf}>
              <img src={uf} alt="image3" className={style.icon} />
              <input name="idade" type="text" placeholder="Idade" className={style.first} maxLength={3}  />
            </div>
          </div>
          <div className={style.emailDiv}>
            <img src={rua} alt="image4" className={style.icon} />
            <input name="rua" type="text" placeholder="Rua" className={style.last} maxLength={32} />
          </div>
          <div className={style.firstDiv}>
            <div className={style.emailDiv}>
              <img src={bairro} alt="image4" className={style.icon} />
              <input name="bairro" type="text" placeholder="Bairro" className={style.last} maxLength={20} />
            </div>
            <div className={style.emailDiv}>
              <img src={state} alt="image4" className={style.icon} />
              <input name="estado" type="text" placeholder="Estado, ex: PE" className={style.last} maxLength={2} />
            </div>
          </div>
          <div className={style.emailDiv}>
            <img src={bio} alt="image4" className={style.icon} />
            <textarea name="biografia" cols="30" rows="5" placeholder="Biografia" className={style.last} maxLength={200}></textarea>
          </div>
          <div className={style.phoneDiv}>
            <img src={imgLogo} alt="image5" className={style.icon} />
            <input name="imagem" type="file" placeholder="Imagem" className={style.last} />
          </div>
          <button type="submit" className={style.btn}>SALVAR</button>
        </form>
      </div>

    </div>
  );
};

export default Form;
