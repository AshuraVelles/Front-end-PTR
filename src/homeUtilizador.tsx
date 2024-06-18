import React, { useEffect, useState } from 'react';
import './Base-page.css';
import useAuthFetch from './hooks/useAuthFetch';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
interface LostItem {
    id: number;
    titulo: string;
    descricao_curta: string;
    data_perdido: string;
    ativo: boolean;
}

const HomeUtilizador: React.FC = () => {
    const [lostItems, setLostItems] = useState<LostItem[]>([]);
    const [loadingItems, setLoadingItems] = useState(true);
    const authFetch = useAuthFetch();
    let navigate = useNavigate();

    useEffect(() => {
        const fetchLostItems = async () => {
            try {
              const data = await authFetch(`${apiUrl}/users/mylostitems`);
              setLostItems(data);
              setLoadingItems(false);
            } catch (error) {
              console.error('Failed to fetch lost items:', error);
              setLoadingItems(false);
            }
          };
        

        fetchLostItems();
    }, [authFetch]);

    if (loadingItems) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Page-container">
            <div className="welcome-text">Boas Vindas</div>
            <div className="Page-box row m-0 w-100 h-auto">
                <div className='Text-column col-6 w-50 h-auto me-3'>
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
                        
                        <li> <strong>Segurança e Integridade dos Dados:</strong>  Protegemos suas informações 
                        pessoais e garantimos a privacidade dos seus dados.</li>
                    </ul>
                
                    <p>Descubra como a nossa aplicação pode simplificar e 
                    agilizar o processo de recuperação de objetos perdidos.
                    Junte-se a nós e torne-se parte da comunidade que 
                    está a transformar a forma como lidamos com os objetos
                    perdidos e achados. Para saber mais clique aqui.</p>
                </div>
                
                <div className="Lost-item-column col-6 w-50 h-auto m-0">
                    <div className="left-title text-center">Itens perdidos</div>
                    <div className="Found-Item-Button m-0 text-center"><button onClick={() => {navigate("/addLost")}}>Adicionar Objeto Perdido</button></div>
                    {lostItems.length === 0 ? (
                        <div className="home-page-item">Nenhum registo de item perdido encontrado.</div>
                    ) : (
                        lostItems.map((item) => (
                            <div key={item.id} className="home-page-item">
                                {item.titulo} - {item.descricao_curta} - {item.ativo ? "Não encontrado" : "Objeto Encontrado"}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeUtilizador;
