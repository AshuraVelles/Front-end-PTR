import React, { useEffect, useState } from 'react';
import './Base-page.css';
import './homePolicia.css'
import useAuthFetch from './hooks/useAuthFetch';
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
            <div className="Page-box">
                <div className='Text-column'>
                    <div className="Auction-title">Leiloes ativos</div>
                    <div className="Auction-Button"><button>Adicionar Leilão</button></div>
                </div>
                
                <div className="Lost-item-column">
                    <div className="Found-Item-title">Itens encontrados</div>
                    <div className="Found-Item-Button"><button>Adicionar Objeto</button></div>
                    {foundItems.length === 0 ? (
                        <div className="home-page-item">Nenhum registo de item encontrado encontrado.</div>
                    ) : (
                        foundItems.map((item) => (
                            <div key={item.id} className="home-page-item">
                                {item.titulo} - {item.descricao_curta} - {item.ativo ? "Não reclamado" : "Objeto Reclamado"}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePolicia;
