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
    data_achado: string;
    ativo: boolean;
    data_limite: string;
    valor_monetario: string;
}

interface AuctionItem {
    id: number;
    objeto_achado_id: string;
    localizacao: string;
    data_inicio: string;
    data_fim: string;
    valor_base: string;
    ativo: boolean;
}

const SavedInfo: React.FC = () => {
    const [lostItems, setLostItems] = useState<LostItem[]>([]);
    const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
    const [auctionItems, setAuctionItems] = useState<AuctionItem[]>([]);
    const [loadingLostItems, setLoadingLostItems] = useState(true);
    const [loadingFoundItems, setLoadingFoundItems] = useState(true);
    const [loadingAuctionItems, setLoadingAuctionItems] = useState(true);
    const [editingLostItemId, setEditingLostItemId] = useState<number | null>(null);
    const [editingFoundItemId, setEditingFoundItemId] = useState<number | null>(null);
    const [editingAuctionItemId, setEditingAuctionItemId] = useState<number | null>(null);
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
                const data = await authFetch(`${apiUrl}/items/found`);
                setFoundItems(data);
                setLoadingFoundItems(false);
            } catch (error) {
                console.error('Failed to fetch found items:', error);
                setLoadingFoundItems(false);
            }
        };

        const fetchAuctionItems = async () => {
            try {
                const data = await authFetch(`${apiUrl}/auctions/auctions`);
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

    const handleEditLostItem = (id: number) => {
        setEditingLostItemId(id);
    };

    const handleEditFoundItem = (id: number) => {
        setEditingFoundItemId(id);
    };

    const handleEditAuctionItem = (id: number) => {
        setEditingAuctionItemId(id);
    };



    const handleRemoveLostItem = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          try {
            const response = await authFetch(`${apiUrl}/users/mylostitems/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setLostItems(lostItems.filter(item => item.id !== id));
            } else {
            }
          } catch (error) {
            console.error("Error deleting data:", error);
          }
        }
      };


      const handleRemoveFoundItem = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          try {
            const response = await authFetch(`${apiUrl}/items/found/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setFoundItems(foundItems.filter(item => item.id !== id));
            } else {
            }
          } catch (error) {
            console.error("Error deleting data:", error);
          }
        }
      };



      const handleRemoveAuction = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this Auction?')) {
          try {
            const response = await authFetch(`${apiUrl}/auctions/auctions/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setAuctionItems(auctionItems.filter(item => item.id !== id));
            } else {
            }
          } catch (error) {
            console.error("Error deleting data:", error);
          }
        }
      };
    


    const handleSaveLostItem = async (id: number, newData: LostItem) => {
        try {
            const response = await authFetch(`${apiUrl}/users/mylostitems/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });
            if (response.ok) {
                // Update lostItems state with the new data
                setLostItems(prevLostItems =>
                    prevLostItems.map(item => (item.id === id ? { ...item, ...newData } : item))
                );
                setEditingLostItemId(null);
            } else {
                console.error('Failed to save lost item:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to save lost item:', error);
        }
    };

    const handleSaveFoundItem = async (id: number, newData: FoundItem) => {
        try {
            const response = await authFetch(`${apiUrl}/items/found/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });
            if (response.ok) {
                // Update foundItems state with the new data
                setFoundItems(prevFoundItems =>
                    prevFoundItems.map(item => (item.id === id ? { ...item, ...newData } : item))
                );
                setEditingFoundItemId(null);
            } else {
                console.error('Failed to save found item');
            }
        } catch (error) {
            console.error('Failed to save found item:', error);
        }
    };

    const handleSaveAuctionItem = async (id: number, newData: AuctionItem) => {
        try {
            const response = await authFetch(`${apiUrl}/auctions/auctions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });
            if (response.ok) {
                // Update auctionItems state with the new data
                setAuctionItems(prevAuctionItems =>
                    prevAuctionItems.map(item => (item.id === id ? { ...item, ...newData } : item))
                );
                setEditingAuctionItemId(null);
            } else {
                console.error('Failed to save auction item');
            }
        } catch (error) {
            console.error('Failed to save auction item:', error);
        }
    };

    if (loadingLostItems || loadingFoundItems || loadingAuctionItems) {
        return <div className='text-center mt-5 pt-5 h4'>A carregar...</div>;
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
                            {editingLostItemId === item.id ? (
                                <>
                                    <div><input type="text" defaultValue={item.titulo} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, titulo: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.descricao_curta} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, descricao_curta: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_perdido} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, data_perdido: e.target.value } : i))} /></div>
                                    <div><button>Detalhes</button></div>
                                    <div><button onClick={() => handleSaveLostItem(item.id, item)}>Salvar</button></div>
                                    <div><button onClick={() => handleRemoveLostItem(item.id)}>Remover</button></div>
                                </>
                            ) : (
                                <>
                                    <div>{item.titulo}</div>
                                    <div>{item.descricao_curta}</div>
                                    <div>{item.data_perdido}</div>
                                    <div><button>Detalhes</button></div>
                                    <div><button onClick={() => handleEditLostItem(item.id)}>Editar</button></div>
                                    <div><button onClick={() => handleRemoveLostItem(item.id)}>Remover</button></div>
                                </>
                            )}
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
                            {editingFoundItemId === item.id ? (
                                <>
                                    <div><input type="text" defaultValue={item.titulo} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, titulo: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.descricao_curta} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, descricao_curta: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_achado} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, data_achado: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_limite} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, data_limite: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.valor_monetario} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, valor_monetario: e.target.value } : i))} /></div>
                                    <div><button>Detalhes</button></div>
                                    <div><button onClick={() => handleSaveFoundItem(item.id, item)}>Salvar</button></div>
                                    <div><button onClick={() => handleRemoveFoundItem(item.id)}>Remover</button></div>
                                </>
                            ) : (
                                <>
                                    <div>{item.titulo}</div>
                                    <div>{item.descricao_curta}</div>
                                    <div>{item.data_achado}</div>
                                    <div>{item.data_limite}</div>
                                    <div>{item.valor_monetario}</div>
                                    <div><button>Detalhes</button></div>
                                    <div><button onClick={() => handleEditFoundItem(item.id)}>Editar</button></div>
                                    <div><button onClick={() => handleRemoveFoundItem(item.id)}>Remover</button></div>
                                </>
                            )}
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
                    <div>Detalhes</div>
                    <div>Editar</div>
                    <div>Remover</div>
                </div>
                {auctionItems.filter(item => item.ativo).length === 0 ? (
                    <div className='grid-row'>Nenhum leilão ativo encontrado.</div>
                ) : (
                    auctionItems.filter(item => item.ativo).map(item => (
                        <div key={item.id} className='grid-row'>
                            {editingAuctionItemId === item.id ? (
                                <>
                                    <div><input type="text" defaultValue={item.objeto_achado_id} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, objeto_achado_id: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.localizacao} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, localizacao: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_inicio} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, data_inicio: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_fim} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, data_fim: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.valor_base} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, valor_base: e.target.value } : i))} /></div>
                                    <div><button>Detalhes</button></div>
                                    <div><button onClick={() => handleSaveAuctionItem(item.id, item)}>Salvar</button></div>
                                    <div><button onClick={() => handleRemoveAuction(item.id)}>Remover</button></div>
                                </>
                            ) : (
                                <>
                                    <div>{item.objeto_achado_id}</div>
                                    <div>{item.localizacao}</div>
                                    <div>{item.data_inicio}</div>
                                    <div>{item.data_fim}</div>
                                    <div>{item.valor_base}</div>
                                    <div><button>Detalhes</button></div>
                                    <div><button onClick={() => handleEditAuctionItem(item.id)}>Editar</button></div>
                                    <div><button onClick={() => handleRemoveAuction(item.id)}>Remover</button></div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Repeat similar structure for Inactive Items */}

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
                            {editingLostItemId === item.id ? (
                                <>
                                    <div><input type="text" defaultValue={item.titulo} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, titulo: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.descricao_curta} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, descricao_curta: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_perdido} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, data_perdido: e.target.value } : i))} /></div>
                                    <div><button>Detalhes</button></div>
                                </>
                            ) : (
                                <>
                                    <div>{item.titulo}</div>
                                    <div>{item.descricao_curta}</div>
                                    <div>{item.data_perdido}</div>
                                    <div><button>Detalhes</button></div>
                                </>
                            )}
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
                            {editingFoundItemId === item.id ? (
                                <>
                                    <div><input type="text" defaultValue={item.titulo} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, titulo: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.descricao_curta} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, descricao_curta: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_achado} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, data_achado: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_limite} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, data_limite: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.valor_monetario} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, valor_monetario: e.target.value } : i))} /></div>
                                    <div><button>Detalhes</button></div>
                                </>
                            ) : (
                                <>
                                    <div>{item.titulo}</div>
                                    <div>{item.descricao_curta}</div>
                                    <div>{item.data_achado}</div>
                                    <div>{item.data_limite}</div>
                                    <div>{item.valor_monetario}</div>
                                    <div><button>Detalhes</button></div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
            <h1>Leilões Inativos</h1>
            <div className='InactiveAuctionTable'>
                <div className='grid-header'>
                    <div>ID do objeto em leilão</div>
                    <div>Localização</div>
                    <div>Data de inicio</div>
                    <div>Data de fim</div>
                    <div>Valor inicial</div>
                    <div>Detalhes</div>
                </div>
                {auctionItems.filter(item => !item.ativo).length === 0 ? (
                    <div className='grid-row'>Nenhum leilão inativo encontrado.</div>
                ) : (
                    auctionItems.filter(item => !item.ativo).map(item => (
                        <div key={item.id} className='grid-row'>
                            {editingAuctionItemId === item.id ? (
                                <>
                                    <div><input type="text" defaultValue={item.objeto_achado_id} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, objeto_achado_id: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.localizacao} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, localizacao: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_inicio} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, data_inicio: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_fim} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, data_fim: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.valor_base} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, valor_base: e.target.value } : i))} /></div>
                                    <div><button>Detalhes</button></div>
                                </>
                            ) : (
                                <>
                                    <div>{item.objeto_achado_id}</div>
                                    <div>{item.localizacao}</div>
                                    <div>{item.data_inicio}</div>
                                    <div>{item.data_fim}</div>
                                    <div>{item.valor_base}</div>
                                    <div><button>Detalhes</button></div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SavedInfo;