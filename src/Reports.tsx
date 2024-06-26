import React from 'react';


const Report: React.FC = () => {

  return (
    <div className='text-center mt-3'>
        <h1 className='mb-3'>Relatórios</h1>
        <div className='row d-lg-flex d-none'>
            <div className='col-lg-4'>
                <button>Estatisticas Utilizador</button>
            </div>
            <div className='col-lg-4'>
                <button>Estatisticas Geral</button>
            </div>
            <div className='col-lg-4'>
                <button>Estatisticas Policias</button>
            </div>
        
        <hr />
       
            <div className='col-lg-4'>
                <button>Estatisticas Objetos</button>
            </div>
            <div className='col-lg-4'>
                <button>Estatisticas Objetos Perdidos</button>
            </div>
            <div className='col-lg-4'>
                <button>Estatisticas Objetos Achados</button>
            </div>

      

      <hr />
      
            <div className='col-lg-4'>
                <button>Estatisticas Leilões</button>
            </div>
            <div className='col-lg-4'>
                <button>Estatisticas Leilões Ativos</button>
            </div>
            <div className='col-lg-4'>
                <button>Estatisticas Leilões Finalizados</button>
            </div>
        </div>

        <div className='row d-lg-none d-flex'>
            <div className='col-4 border-end'>
                <button>Estatisticas Geral</button>
                <button>Estatisticas Utilizador</button>
                <button>Estatisticas Policias</button>
            </div>
       
            <div className='col-4 border-end'>
                <button>Estatisticas Objetos</button>
                <button>Estatisticas Objetos Perdidos</button>
                <button>Estatisticas Objetos Achados</button>
            </div>
        
            <div className='col-4'>
                <button>Estatisticas Leilões</button>
                <button>Estatisticas Leilões Ativos</button>
                <button>Estatisticas Leilões Finalizados</button>
            </div>
        </div>
      
    </div>
  );
};

export default Report;