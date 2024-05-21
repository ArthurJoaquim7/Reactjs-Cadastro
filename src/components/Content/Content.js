import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

import style from '../Content/Content.module.css';

// IMG
import del from '../img/del.png';
import edit from '../img/edit.png';
import e404 from '../img/404.svg';

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8081/${id}`)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);
        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <div className={style.container}>
      {users.length === 0 ? (
        <div className={style.empty}>
          <h1 className={style.h1}>Crie um <span className={style.purple}>cadastro</span>!</h1>
          <img src={e404} alt="image0" className={style.e404} />
        </div>
      ) : (
        users.map((item, i) => (
          <div className={style.all} key={i}>
            <div className={style.card}>
              <div className={style.leftCard}>
                <img src={`http://localhost:8081${item.imagem}`} alt="imagem" className={style.imgShow} />
              </div>
              <div className={style.rightCard}>
                <div className={style.nomeDiv}>
                  <h2 className={style.nome}>{item.nome}</h2>
                  <h4 className={style.idade}>{item.idade} anos</h4>
                </div>
                <div className={style.bio}>
                  <p className={style.bioP}>" {item.biografia} "</p>
                </div>
                <div className={style.address}>
                  <h3 className={style.h3}>{item.rua},</h3>
                  <h3 className={style.h3}>&nbsp;{item.bairro} - &nbsp;</h3>
                  <h3 className={style.estado}>{item.estado}</h3>
                </div>
                <div className={style.state}>
                </div>
                <div className={style.toolsDiv}>
                  <img src={edit} alt="Editar" onClick={() => handleEdit(item)} className={style.tools} />
                  <img src={del} alt="Deletar" onClick={() => handleDelete(item.id)} className={style.tools} />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Grid;
