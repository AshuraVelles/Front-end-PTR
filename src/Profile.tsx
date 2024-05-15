import React from 'react';
import './Base-page.css'
import "./Profile.css"
import Header from './Components/Header.tsx';
import { useNavigate } from 'react-router-dom';



const Profile : React.FC = () => {

    let navigate = useNavigate();


    const Information = [
        { id: "Username", info: 'Ash'  },
        { id: "Password", info: '12345'  },
        { id: "Primeiro-Nome", info: 'Ashura'  },
        { id: "Ultimo-Nome", info: 'Velles'  },
        { id: "Email", info: 'Ashvell@blabla.com'  },
        { id: "Genero", info: 'bastard'  },
        { id: "Data-nascimento", info: '1/1/1000'  },
        { id: "Morada", info: 'Nowhere'  },
        { id: "Codigo-Postal", info: '1111-111'  },
        { id: "NIF", info: '11111111' },
        { id: "Cartao-Cidadao", info: '234524324' },
        { id: "Num-telemovel", info: '123654532' },
      ];


return (

<div className="Page-container">
   
  <div className="welcome-text">Perfil</div>
<div className="Page-box">
  
    <div className='Profile-information'>
    
    <div className="Profile-itens">Username</div>
    <div className="Profile-itens">coisas</div>

    <div className="Profile-itens">Password</div>
    <div className="Profile-itens">coisas</div>

    <div className="Profile-itens">Primeiro Nome</div>
    <div className="Profile-itens">coisas</div>

    <div className="Profile-itens">Ultimo Nome</div>
    <div className="Profile-itens">coisas</div>

    <div className="Profile-itens">Email</div>
    <div className="Profile-itens">coisas</div>

    <div className="Profile-itens">Género</div>
    <div className="Profile-itens">coisas</div>

    <div className="Profile-itens">Data Nascimento</div>
    <div className="Profile-itens">coisas</div>

    <div className="Profile-itens">Morada</div>
    <div className="Profile-itens">coisas</div>

    <div className="Profile-itens">Código Postal</div>
    <div className="Profile-itens">coisas</div>

    <div className="Profile-itens">NIF</div>
    <div className="Profile-itens">coisas</div>

    <div className="Profile-itens">Cartão Cidadão</div>
    <div className="Profile-itens">coisas</div>

    <div className="Profile-itens">Nº Telemovel</div>
    <div className="Profile-itens">coisas</div>



    </div>
    
    <div className='Lost-item-column'>

    <div className="Profile-itens">Itens Perdidos registados</div>

    <div className="Profile-itens">coisas</div>
    <div className="Profile-itens">coisas</div>
    <div className="Profile-itens">coisas</div>
    <div className="Profile-itens">coisas</div>
    <div className="Profile-itens">coisas</div>
    <div className="Profile-itens">coisas</div>
    

    
    </div>
    
  </div>
  </div>
);

};

export default Profile;