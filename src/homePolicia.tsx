import React, { useEffect, useState } from 'react';
import './Base-page.css';
import './homePolicia.css'
import useAuthFetch from './hooks/useAuthFetch';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

interface FoundItem {
    id: number;
    titulo: string;
    descricao_curta: string;
    data_achado: string;
    ativo: boolean;
    policialId: number;
}

const HomePolicia: React.FC = () => {
    const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
    const [loadingItems, setLoadingItems] = useState(true);
    const authFetch = useAuthFetch();
    let navigate = useNavigate();
    useEffect(() => {
        const fetchFoundItems = async () => {
            try {
                const data = await authFetch(`${apiUrl}/items/found`);
                setFoundItems(data);
                setLoadingItems(false);
            } catch (error) {
                console.error('Failed to fetch found items:', error);
                setLoadingItems(false);
            }
        };

        fetchFoundItems();
    }, [authFetch]);

    if (loadingItems) {
        return <div>Loading...</div>;
    }


    
    
    return (
        <div className="Page-container">
            <div className="welcome-text">Boas Vindas</div>
            <div className="Page-box row m-0 w-100 h-auto">
                <div className='Text-column col-6 w-50 h-auto me-3'>

                <div className="Auction-title m-0 text-center">Leiloes ativos</div>


                </div>
                
                <div className="Lost-item-column col-6 w-50 h-auto m-0">
                    <div className="Found-Item-title m-0 text-center">Itens</div>
                    <div className="Found-Item-Button m-0 text-center"><button onClick={() => {navigate("/addFound")}}>Adicionar Objeto Encontrado</button></div>
                    {foundItems.length === 0 ? (
                        <div className="home-page-item">Nenhum registo de item encontrado encontrado.</div>
                    ) : (
                        foundItems.map((item) => (
                            <div key={item.id} className="home-page-item">
                                {item.titulo} - {item.descricao_curta} - {item.ativo ? "Não reclamado" : "Objeto Reclamado"}
                            </div>
                        ))
                    )}
                    <div className="Found-Item-Button m-0 text-center"><button onClick={() => {navigate("/addLost")}}>Adicionar Objeto Perdido</button></div>
                </div>
            </div>
        </div>
    );
};

export default HomePolicia;
