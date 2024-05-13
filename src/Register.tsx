import { useState } from 'react';
import './register.css';
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
          
            <div className= "inputvalue">
              <h6 className = "inputString">Username</h6>
            <input
                type="text"
                placeholder="Escolhe um Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className= "inputvalue">
            <h6 className = "inputString">Password</h6>
                <input
                type="text"
                placeholder="Escolha uma Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className= "inputvalue">
              <h6 className = "inputString">Primeiro Nome</h6>
                <input
                type="text"
                placeholder="Primeiro Nome"
                value={FirstName}
                onChange={(e) => setFirstname(e.target.value)}/>
            </div>
            <div className= "inputvalue">
            <h6 className = "inputString">Ultimo Nome</h6>
                <input
                type="text"
                placeholder="Último Nome"
                value={LastName}
                onChange={(e) => setLastname(e.target.value)}/>
            </div>
            <div className= "inputvalue">
            <h6 className = "inputString">Email</h6>
                <input
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className= "inputvalue">
            <h6 className = "inputString">Género</h6>
                <input
                type="text"
                placeholder="Género"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}/>
            </div>
            <div className= "inputvalue">
            <h6 className = "inputString">Data Nascimento</h6>
                <input
                type="text"
                placeholder="Data de Nascimento"
                onFocus={(e) => (e.target.type = 'date')}
                value={dataNasc}
                onChange={(e) => setdataNasc(e.target.value)}/>
            </div>
            </div>
            <div className='right'>
            <div className= "inputvalue">
            <h6 className = "inputString">Morada</h6>
                <input
                type="text"
                placeholder="Morada"
                value={morada}
                onChange={(e) => setMorada(e.target.value)}/>
            </div>
            <div className= "inputvalue">
            <h6 className = "inputString">Código Postal</h6>
                <input
                type="text"
                placeholder="Código Postal"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}/>
            </div>
            <div className= "inputvalue">
            <h6 className = "inputString">NIF</h6>
                <input
                type="text"
                placeholder="NIF"
                value={NIF}
                onChange={(e) => setNIF(e.target.value)}/>
            </div>
            <div className= "inputvalue">
            <h6 className = "inputString">Cartão Cidadão</h6>
                <input
                type="text"
                placeholder="Número de Cartão de Cidadão"
                value={numeroCC}
                onChange={(e) => setNumeroCC(e.target.value)}/>
            </div>
            <div className= "inputvalue">
            <h6 className = "inputString">Nº Telemovel</h6>
                <input
                type="text"
                placeholder="Nº Telemóvel"
                value={nTelemovel}
                onChange={(e) => setNTelemovel(e.target.value)}/>
            </div>
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