import React, { useEffect, useState } from 'react';
import './AllSavedStuffUser.css';
import useAuthFetch from './hooks/useAuthFetch';
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

interface LostItem {
    id: number;
    titulo: string;
    descricao_curta: string;
    data_perdido: string;
    ativo: boolean;
}

interface FoundItem {
    id: number;
    titulo: string;
    descricao_curta: string;
    data_encontrado: string;
    ativo: boolean;
    deadline: string;
    valor: string;
}

interface AuctionItem {
    id: number;
    nome_objeto: string;
    localizacao: string;
    data_inicio: string;
    data_fim: string;
    valor_inicial: string;
    valor_atual: string;
    ativo: boolean;
}

const SavedInfo: React.FC = () => {
    const [lostItems, setLostItems] = useState<LostItem[]>([]);
    const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
    const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([]);
    const [loadingLostItems, setLoadingLostItems] = useState(true);
    const [loadingFoundItems, setLoadingFoundItems] = useState(true);
    const [loadingAuctionItems, setLoadingAuctionItems] = useState(true);
    const authFetch = useAuthFetch();

    useEffect(() => {
        const fetchLostItems = async () => {
            try {
                const data = await authFetch(`${apiUrl}/users/mylostitems`);
                setLostItems(data);
                setLoadingLostItems(false);
            } catch (error) {
                console.error('Failed to fetch lost items:', error);
                setLoadingLostItems(false);
            }
        };

        const fetchFoundItems = async () => {
            try {
                const data = await authFetch(`${apiUrl}/users/myfounditems`);
                setFoundItems(data);
                setLoadingFoundItems(false);
            } catch (error) {
                console.error('Failed to fetch found items:', error);
                setLoadingFoundItems(false);
            }
        };

        const fetchAuctionItems = async () => {
            try {
                const data = await authFetch(`${apiUrl}/users/myauctions`);
                setAuctionItems(data);
                setLoadingAuctionItems(false);
            } catch (error) {
                console.error('Failed to fetch auction items:', error);
                setLoadingAuctionItems(false);
            }
        };

        fetchLostItems();
        fetchFoundItems();
        fetchAuctionItems();
    }, [authFetch]);

    if (loadingLostItems || loadingFoundItems || loadingAuctionItems) {
        return <div>Loading...</div>;
    }

    return (
        <div className="SavedInfoPage">
            <h1>Objetos Perdidos Ativos</h1>
            <div className='ActiveLostItemTable'>
                <div className='grid-header'>
                    <div>Nome/Descrição curta</div>
                    <div>Categoria</div>
                    <div>Data de quando foi perdido</div>
                    <div>Detalhes</div>
                    <div>Editar</div>
                    <div>Remover</div>
                </div>
                {lostItems.filter(item => item.ativo).length === 0 ? (
                    <div className='grid-row'>Nenhum objeto perdido ativo encontrado.</div>
                ) : (
                    lostItems.filter(item => item.ativo).map(item => (
                        <div key={item.id} className='grid-row'>
                            <div>{item.titulo}</div>
                            <div>{item.descricao_curta}</div>
                            <div>{item.data_perdido}</div>
                            <div><button>Detalhes</button></div>
                            <div><button>Editar</button></div>
                            <div><button>Remover</button></div>
                        </div>
                    ))
                )}
            </div>
            <h1>Objetos Achados Ativos</h1>
            <div className='ActiveFoundItemTable'>
                <div className='grid-header'>
                    <div>Nome/Descrição curta</div>
                    <div>Categoria</div>
                    <div>Data de quando foi encontrado</div>
                    <div>Deadline</div>
                    <div>Valor</div>
                    <div>Detalhes</div>
                    <div>Editar</div>
                    <div>Remover</div>
                </div>
                {foundItems.filter(item => item.ativo).length === 0 ? (
                    <div className='grid-row'>Nenhum objeto achado ativo encontrado.</div>
                ) : (
                    foundItems.filter(item => item.ativo).map(item => (
                        <div key={item.id} className='grid-row'>
                            <div>{item.titulo}</div>
                            <div>{item.descricao_curta}</div>
                            <div>{item.data_encontrado}</div>
                            <div>{item.deadline}</div>
                            <div>{item.valor}</div>
                            <div><button>Detalhes</button></div>
                            <div><button>Editar</button></div>
                            <div><button>Remover</button></div>
                        </div>
                    ))
                )}
            </div>
            <h1>Leilões Ativos</h1>
            <div className='ActiveAuctionTable'>
                <div className='grid-header'>
                    <div>Nome do Objeto</div>
                    <div>Localização</div>
                    <div>Data de inicio</div>
                    <div>Data de fim</div>
                    <div>Valor inicial</div>
                    <div>Valor no momento</div>
                    <div>Detalhes</div>
                    <div>Editar</div>
                    <div>Remover</div>
                </div>
                {auctionItems.filter(item => item.ativo).length === 0 ? (
                    <div className='grid-row'>Nenhum leilão ativo encontrado.</div>
                ) : (
                    auctionItems.filter(item => item.ativo).map(item => (
                        <div key={item.id} className='grid-row'>
                            <div>{item.nome_objeto}</div>
                            <div>{item.localizacao}</div>
                            <div>{item.data_inicio}</div>
                            <div>{item.data_fim}</div>
                            <div>{item.valor_inicial}</div>
                            <div>{item.valor_atual}</div>
                            <div><button>Detalhes</button></div>
                            <div><button>Editar</button></div>
                            <div><button>Remover</button></div>
                        </div>
                    ))
                )}
            </div>

            <h1>Objetos Perdidos Inativos</h1>
            <div className='InactiveLostItemTable'>
                <div className='grid-header'>
                    <div>Nome/Descrição curta</div>
                    <div>Categoria</div>
                    <div>Data de quando foi perdido</div>
                    <div>Detalhes</div>
                </div>
                {lostItems.filter(item => !item.ativo).length === 0 ? (
                    <div className='grid-row'>Nenhum objeto perdido inativo encontrado.</div>
                ) : (
                    lostItems.filter(item => !item.ativo).map(item => (
                        <div key={item.id} className='grid-row'>
                            <div>{item.titulo}</div>
                            <div>{item.descricao_curta}</div>
                            <div>{item.data_perdido}</div>
                            <div><button>Detalhes</button></div>
                        </div>
                    ))
                )}
            </div>
            <h1>Objetos Achados Inativos</h1>
            <div className='InactiveFoundItemTable'>
                <div className='grid-header'>
                    <div>Nome/Descrição curta</div>
                    <div>Categoria</div>
                    <div>Data de quando foi encontrado</div>
                    <div>Deadline</div>
                    <div>Valor</div>
                    <div>Detalhes</div>
                </div>
                {foundItems.filter(item => !item.ativo).length === 0 ? (
                    <div className='grid-row'>Nenhum objeto achado inativo encontrado.</div>
                ) : (
                    foundItems.filter(item => !item.ativo).map(item => (
                        <div key={item.id} className='grid-row'>
                            <div>{item.titulo}</div>
                            <div>{item.descricao_curta}</div>
                            <div>{item.data_encontrado}</div>
                            <div>{item.deadline}</div>
                            <div>{item.valor}</div>
                            <div><button>Detalhes</button></div>
                        </div>
                    ))
                )}
            </div>
            <h1>Leilões Inativos</h1>
            <div className='InactiveAuctionTable'>
                <div className='grid-header'>
                    <div>Nome do Objeto</div>
                    <div>Localização</div>
                    <div>Data de inicio</div>
                    <div>Data de fim</div>
                    <div>Valor inicial</div>
                    <div>Valor no momento</div>
                    <div>Detalhes</div>
                </div>
                {auctionItems.filter(item => !item.ativo).length === 0 ? (
                    <div className='grid-row'>Nenhum leilão inativo encontrado.</div>
                ) : (
                    auctionItems.filter(item => !item.ativo).map(item => (
                        <div key={item.id} className='grid-row'>
                            <div>{item.nome_objeto}</div>
                            <div>{item.localizacao}</div>
                            <div>{item.data_inicio}</div>
                            <div>{item.data_fim}</div>
                            <div>{item.valor_inicial}</div>
                            <div>{item.valor_atual}</div>
                            <div><button>Detalhes</button></div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SavedInfo;
