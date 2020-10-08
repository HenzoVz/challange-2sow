import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import LoaderComponent from '../../components/Loader';

import { ToastContainer, toast, ToastContent } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notData  from '../../assets/nodata-found.png';

import { Table } from './styles';

import { BiEditAlt, BsTrash } from 'react-icons/all';

import api from '../../services/api';

interface Data {
  id: string;
  name: string;
  cpf: string
  email: string;
  adress: {
    cep: string;
    street: string;
    number: string;
    district: string;
    city: string;
  }
}

const Listing: React.FC = () => {

  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);

  const notify = (text: ToastContent) => toast(text);

  useEffect(() => {
    setLoading(true)
    api.get('usuarios').then(response => {
      const newData = response.data;
      setData(newData);
      setLoading(false);
    });
  }, []);

  function deleteData(id: string) {
    api.delete(`usuarios/${id}`)
    .then(() => {
      let newData = [...data]
      newData = newData.filter((item) => item.id !== id);
      notify("Cadastro deletado");
      setData(newData);
    });
  };

  return (
    <>
      <Header/>
      <ToastContainer/>
      { loading ? (
        <LoaderComponent />
      ) : (
      <Table>
        { data.length === 0 ? (
          <img src={notData} alt="Sem dados"/>
        ) : (
        <>
        <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Email</th>
          <th>Cidade</th>
          <th>Ações</th>
        </tr>
      </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.cpf}</td>
              <td>{user.email}</td>
              <td>{user.adress.city}</td>
              <td>
                <Link key={user.id} to={`usuario/${user.id}`}>
                  <button className="button-edit" onClick={() => console.log(user.id)}>
                    <BiEditAlt size={20} />
                  </button>
                </Link>
                <button className="button-delete" onClick={() => deleteData(user.id)}>
                  <BsTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
          </>
        )}
      </Table>
      )}
    </>
  );
};

export default Listing;