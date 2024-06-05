import React from 'react';
import './Base-page.css'
import { useNavigate } from 'react-router-dom';


const HomePolicia : React.FC = () => {

    let navigate = useNavigate();


    return (

        <div className="Page-container">
       
      <div className="welcome-text">Boas Vindas</div>
    <div className="Page-box">
      
        <div className='Text-column'>
        <p>Bem-vindo à ReClaimAuctions, a inovadora plataforma 
        que está revolucionando a maneira como lidamos com objetos 
        perdidos e achados.</p>
        
        <p>Com a nossa intuitiva e abrangente aplicação, 
        oferecemos uma gama de serviços essenciais para ajudar você 
        a recuperar seus pertences de forma eficiente e segura:</p>

        <ul>
            <li> <strong>Registo e Pesquisa Simplificados:</strong> Cadastre-se 
            facilmente e encontre rapidamente os objetos perdidos.</li>
            
            <li> <strong>Recuperação Segura de Objetos Achados:</strong> Garantimos 
            a segurança e a integridade dos seus pertences durante todo o 
            processo de recuperação.</li>
            
            <li> <strong>Leilões de Objetos Não Reclamados:</strong>  Explore 
            nossos leilões de objetos não reclamados e encontre tesouros incríveis 
            a preços acessíveis.</li>
            
            <li> <strong>Priorização da Localização:</strong> Utilizamos tecnologia avançada 
            para ajudar na localização rápida e precisa dos seus itens perdidos.</li>
            
            <li> <strong>Segurança e Integridade dos Dados</strong>  Protegemos suas informações 
            pessoais e garantimos a privacidade dos seus dados.</li>
        </ul>
       
        <p>Descubra como a nossa aplicação pode simplificar e 
        agilizar o processo de recuperação de objetos perdidos.
        Junte-se a nós e torne-se parte da comunidade que 
        está a transformar a forma como lidamos com os objetos
        perdidos e achados. Para saber mais clique aqui.</p>
        </div>
        
        <div className='Button-column'>

        <button onClick={() => {navigate("/lostItems")}}> Go to lost Items </button>
        <button onClick={() => {navigate("/foundItems")}}> Go to found Items </button>
        
        </div>
        
      </div>
      </div>
    );

};

export default HomePolicia;