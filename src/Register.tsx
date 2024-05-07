import { useState } from 'react';
import './register.css';
import Navbar from './Components/Navbar';
import Header from './Components/Header';

import { useNavigate } from 'react-router-dom';


function Register() {
  const [username, setUsername] = useState('');
  const [FirstName, setFirstname] = useState('');  
  const [LastName, setLastname] = useState('');
  const [genero, setGenero] = useState('');
  const [dataNasc, setdataNasc] = useState('');
  const [morada, setMorada] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [NIF, setNIF] = useState('');
  const [numeroCC, setNumeroCC] = useState('');
  const [nTelemovel, setNTelemovel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = () => {
    // Your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  let navigate = useNavigate();

  return (

    
    <div className="login-container">
      <Header />
      <div className="welcome-text">Bem-vindos</div>
      <div className="login-box">
       
        <div className="login-title">Registar</div>
        <div className="input-container">
            
        <div className='left'>
          
            <input
                type="text"
                placeholder="Escolhe um Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
                <input
                type="text"
                placeholder="Primeiro Nome"
                value={FirstName}
                onChange={(e) => setFirstname(e.target.value)}/>
                <input
                type="text"
                placeholder="Último Nome"
                value={LastName}
                onChange={(e) => setLastname(e.target.value)}/>
                <input
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                <input
                type="text"
                placeholder="Género"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}/>
                <input
                type="text"
                placeholder="Data de Nascimento"
                onFocus={(e) => (e.target.type = 'date')}
                value={dataNasc}
                onChange={(e) => setdataNasc(e.target.value)}/>
            </div>
            <div className='right'>
                <input
                type="text"
                placeholder="Morada"
                value={morada}
                onChange={(e) => setMorada(e.target.value)}/>
                <input
                type="text"
                placeholder="Código Postal"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}/>
                <input
                type="text"
                placeholder="NIF"
                value={NIF}
                onChange={(e) => setNIF(e.target.value)}/>
                <input
                type="text"
                placeholder="Número de Cartão de Cidadão"
                value={numeroCC}
                onChange={(e) => setNumeroCC(e.target.value)}/>
                <input
                type="text"
                placeholder="Nº Telemóvel"
                value={nTelemovel}
                onChange={(e) => setNTelemovel(e.target.value)}/>
                <input
                type="text"
                placeholder="Escolha uma Palavra-Passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>


            </div>
        </div>
        <div className="bottom-buttons">
            <button  className="register-button" onClick={() => {navigate("/")}}>Criar Conta</button>   
        </div>
        
        
       
      </div>
    </div>
  );
}

export default Register;