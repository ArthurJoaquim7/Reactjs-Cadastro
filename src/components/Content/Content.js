import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

import style from '../Content/Content.module.css'

//IMG
import del from '../img/del.png'
import edit from '../img/edit.png'
import user2 from '../img/user2.png'
import e404 from '../img/404.svg'

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8081/" + id)
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
      <div className={style.full}>
        <div className={style.tags}>
          <div className={style.nomeDiv}>
            <h2 className={`${style.what} ${style.right}`}><span className={style.fff}>N</span>ome</h2>
          </div>
          <div className={style.nomeDiv}>
            <h2 className={`${style.what} ${style.right}`}><span className={style.fff}>U</span>F</h2>
          </div>
          <div className={style.nomeDiv}>
            <h2 className={`${style.what} ${style.right}`}><span className={style.fff}>E</span>MAIL</h2>
          </div>
          <div className={style.nomeDiv}>
            <h2 className={`${style.what} ${style.right2}`}><span className={style.fff}>F</span>ONE</h2>
          </div>
        </div>
        {users.length === 0 ? (
          <div className={style.empty}>
            <h1 className={style.h1}>Crie um <span className={style.purple}>cadastro</span>!</h1>
            <img src={e404} className={style.e404} />
          </div>
        ) : (

          users.map((item, i, o) => (
            <div className={style.all}>
              <div key={i} className={style.cardx}>
                <div className={`${style.tags} ${style.right3}`}>
                  <div className={style.nomeDiv}>
                    <p>{item.nome}</p>
                  </div>
                  <div className={style.nomeDiv}>
                    <p>{item.uf}</p>
                  </div>
                  <div className={style.nomeDiv}>
                    <p>{item.email}</p>
                  </div>
                  <div className={style.nomeDiv}>
                    <p>{item.fone}</p>
                    <img src={edit} onClick={() => handleEdit(item)} className={style.opt} />
                    <img src={del} onClick={() => handleDelete(item.id)} className={style.opt2} />
                  </div>
                </div>
              </div>
              {/* =================== */}
              <div key={o} className={style.card}>
                <img src={user2} className={style.user2} />
                <div className={style.nome}>
                  <h2 className={style.what}>Nome:</h2>
                  <h3>{item.nome}</h3>
                  <div className={style.uf}>
                    <h2 className={style.what}>UF:</h2>
                    <h3>{item.uf}</h3>
                  </div>
                </div>
                <div className={style.email}>
                  <h2 className={style.what}>Email:</h2>
                  <h3>{item.email}</h3>
                </div>
                <div className={style.phone}>
                  <h2 className={style.what}>Fone:</h2>
                  <h3>{item.fone}</h3>
                </div>
                <div className={style.toolsDiv}>
                  <img src={edit} onClick={() => handleEdit(item)} className={style.tools} />
                  <img src={del} onClick={() => handleDelete(item.id)} className={style.tools} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
