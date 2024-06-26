import React from 'react';
import './Base-page.css'
import './Welcome-Page.css'
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

const WelcomePage : React.FC = () => {

    let navigate = useNavigate();

    return (
        <div className="Page-container">
            <div className="welcome-text">Boas Vindas</div>
             <Carousel className='Text-column w-100' data-bs-theme="dark" style={{height:'50vh'}}>
                <Carousel.Item >
                    <div className='row' style={{marginTop:'-30px'}}>
                        <div className='col-2'></div>
                        <div className='col-8 d-flex align-items-center' style={{height:'40vh'}}>
                            <div className='Text-column w-100 h-auto'>
                            <p>Bem-vindo à ReClaimAuctions, a inovadora plataforma 
                        que está revolucionando a maneira como lidamos com objetos 
                        perdidos e achados.</p>
                            </div> 
                        </div>
                        <div className='col-2'></div>
                    </div>
                
                   
                </Carousel.Item>
                <Carousel.Item>
                <div className='row' style={{marginTop:'-30px'}}>
                        <div className='col-2'></div>
                        <div className='col-8 d-flex align-items-center' style={{height:'40vh'}}>
                            <div className='Text-column w-100 h-auto'>
                            <p>Com a nossa intuitiva e abrangente aplicação, 
                    oferecemos uma gama de serviços essenciais para ajudar você 
                    a recuperar seus pertences de forma eficiente e segura:</p>
                            </div> 
                        </div>
                        <div className='col-2'></div>
                    </div>
                

                   
                </Carousel.Item>
                <Carousel.Item className='p-5'>
                <div className='row' style={{marginTop:'-30px'}}>
                    <div className='col-1'></div>
                        <div className='col-auto Text-column w-100 h-auto mx-1'><p><strong>Registo e Pesquisa Simplificados:</strong> Cadastre-se 
                        facilmente e encontre rapidamente os objetos perdidos.</p></div>
                       
                        <div className='col-auto Text-column w-100 h-auto mx-1'><p><strong>Recuperação Segura de Objetos Achados:</strong> Garantimos 
                        a segurança e a integridade dos seus pertences durante todo o 
                        processo de recuperação.</p></div>

                        <div className='col-auto Text-column w-100 h-auto mx-1'><p><strong>Leilões de Objetos Não Reclamados:</strong>  Explore 
                        nossos leilões de objetos não reclamados e encontre tesouros incríveis 
                        a preços acessíveis.</p></div>
                    <div className='col-1'></div>
                    </div>
                
                    
                </Carousel.Item>
                <Carousel.Item className='p-5'>
                <div className='row' style={{marginTop:'-30px'}}>
                    <div className='col-2'></div>
                        <div className='col-4 Text-column w-100 h-auto mx-1'><p><strong>Priorização da Localização:</strong> Utilizamos tecnologia avançada 
                        para ajudar na localização rápida e precisa dos seus itens perdidos.</p></div>
                       
                        <div className='col-4 Text-column w-100 h-auto mx-1'><p><strong>Segurança e Integridade dos Dados</strong>  Protegemos suas informações 
                        pessoais e garantimos a privacidade dos seus dados.</p></div>

                        <div className='col-2'></div>
                        
                    </div>
                
                    
                </Carousel.Item>
                <Carousel.Item>
                <div className='row' style={{marginTop:'-30px'}}>
                        <div className='col-2'></div>
                        <div className='col-8 d-flex align-items-center' style={{height:'40vh'}}>
                            <div className='Text-column w-100 h-auto'>
                            <p>Descubra como a nossa aplicação pode simplificar e 
                    agilizar o processo de recuperação de objetos perdidos.
                    Junte-se a nós e torne-se parte da comunidade que 
                    está a transformar a forma como lidamos com os objetos
                    perdidos e achados. Para saber mais clique aqui.</p>
                            </div> 
                        </div>
                        <div className='col-2'></div>
                    </div>
                

                   
                </Carousel.Item>
            </Carousel>
            
            <div className="row w-100 h-auto m-0">
                <div className='col-6 text-center'>
                <button onClick={() => {navigate("/foundItems")}}>Ir para Objetos Achados</button>
                </div>
                
                <div className='col-6 text-center'>
                    <button onClick={() => {navigate("/lostItems")}}>Ir para Objetos Perdidos</button>

                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
