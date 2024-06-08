import React from 'react';
import './AdminHome.css';
import { useNavigate } from 'react-router-dom';


const members = [
    { id: 1, postoPolicia: 'Sargento', historicoPolicia: '10 anos de serviço' },
    { id: 2, postoPolicia: 'Capitão', historicoPolicia: '15 anos de serviço' },
    { id: 3, postoPolicia: 'Tenente', historicoPolicia: '8 anos de serviço' },
    { id: 4, postoPolicia: 'Coronel', historicoPolicia: '20 anos de serviço' },
  ];


  const PostosPolicia = [
    { id: 1, morada: 'Rua das Flores, 123' },
    { id: 2, morada: 'Avenida dos Aliados, 456' },
    { id: 3, morada: 'Praça da Liberdade, 789' },
    // Add more entries as needed
  ];


  const AdminHome: React.FC = () => {

    let navigate = useNavigate();

    return (
        <div className='Pagina'>
        <div className='DivHeader-Policias'>
        <h1>Policias</h1>
        <h1></h1>
        <h1></h1>
        <h1></h1>
        <button onClick={() => {navigate("/RegisterPolicia")}}>Adicionar</button>
        </div>
      <div className="grid-Policias">
        <div className="grid-header">
          <div>ID</div>
          <div>Posto Policia</div>
          <div>Historico Policia</div>
          <div>Editar</div>
          <div>Remover</div>
        </div>
        {members.map((member) => (
          <div key={member.id} className="grid-row">
            <div>{member.id}</div>
            <div>{member.postoPolicia}</div>
            <div>{member.historicoPolicia}</div>
            <div><button onClick={() => {navigate("/EditPolicia")}}>Editar</button></div>
            <div><button onClick={() => handleRemove(member.id)}>Remover</button></div>
          </div>
        ))}
    </div>



        <div className='DivHeader-PostosPolicia'>
        <h1>Postos de Policia</h1>
        <h1></h1>
        <h1></h1>
        <button onClick={() => {navigate("/AddPostoPolicia")}}>Adicionar</button>
        </div>
      <div className="grid-PostosPolicia">
        <div className="grid-header">
          <div>ID</div>
          <div>Morada</div>
          <div>Editar</div>
          <div>Remover</div>
        </div>
        {PostosPolicia.map((Posto) => (
          <div key={Posto.id} className="grid-row">
            <div>{Posto.id}</div>
            <div>{Posto.morada}</div>
            <div><button onClick={() => {navigate("/EditPostoPolicia")}}>Editar</button></div>
            <div><button onClick={() => handleRemove(Posto.id)}>Remover</button></div>
          </div>
        ))}
      </div>


 </div>



  );
};


const handleEdit = (id: number) => {
    // Your edit logic here
    console.log('Edit member with ID:', id);
  };

const handleRemove = (id:number) => {
    console.log("Remove member with ID", id)
};

export default AdminHome;
