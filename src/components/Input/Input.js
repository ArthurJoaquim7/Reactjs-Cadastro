import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import style from '../Input/Input.module.css'

//IMG
import add from '../img/add.png'
import user from '../img/user.png'
import email from '../img/email.png'
import phone from '../img/phone.png'
import uf from '../img/uf.png'


const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.nome.value = onEdit.nome;
      user.uf.value = onEdit.uf;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = ref.current;
    if (
      !user.nome.value ||
      !user.uf.value ||
      !user.email.value ||
      !user.fone.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    if (onEdit) {
      await axios
        .put("http://localhost:8081/" + onEdit.id, {
          nome: user.nome.value,
          uf: user.uf.value,
          email: user.email.value,
          fone: user.fone.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8081", {
          nome: user.nome.value,
          uf: user.uf.value,
          email: user.email.value,
          fone: user.fone.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.uf.value = "";
    user.email.value = "";
    user.fone.value = "";

    setOnEdit(null);
    getUsers();
    setTexto('')
  };

  // ===================
  const [texto, setTexto] = useState('');

  const handleInputChange = (e) => {
    // Obtém o valor do input
    const valorInput = e.target.value;

    // Converte o valor para letras maiúsculas
    const valorEmMaiusculas = valorInput.toUpperCase();

    // Atualiza o estado com o valor em maiúsculas
    setTexto(valorEmMaiusculas);
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <form ref={ref} onSubmit={handleSubmit} className={style.form}>
          <img src={add} className={style.add} />
          <h1 className={style.h1}>CADASTRO</h1>
          {/* ========== */}
          <div className={style.firstDiv}>
            <div className={style.nome}>
              <img src={user} className={style.icon} />
              <input name="nome" placeholder="Nome" className={style.first} maxLength={12} />
            </div>
            {/* = */}
            <div className={style.uf}>
              <img src={uf} className={style.icon} />
              <input name="uf" type="name" placeholder="UF ex: SP" className={style.first} maxLength={2} value={texto}
                onChange={handleInputChange} />
            </div>
          </div>
          {/* ========== */}
          <div className={style.emailDiv}>
            <img src={email} className={style.icon} />
            <input name="email" type="email" placeholder="E-mail" className={style.last} maxLength={30} />
          </div>
          <div className={style.phoneDiv}>
            <img src={phone} className={style.icon} />
            <input name="fone" type="number" placeholder="Telefone" className={style.last} maxLength={13} />
          </div>
          <button type="submit" className={style.btn}>SALVAR</button>
        </form>
      </div>
    </div>

  );
};

export default Form;
