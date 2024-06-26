import React, { useEffect, useState } from 'react';
import './AllSavedStuffUser.css';
import useAuthFetch from './hooks/useAuthFetch';
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

interface LostItem {
    id: number;
    titulo: string;
    descricao_curta: string;
    descricao: string;
    categoria: string;
    data_perdido: string;
    localizacao_perdido: { latitude: string, longitude: string };
    ativo: boolean;
}

interface FoundItem {
    id: number;
    titulo: string;
    descricao_curta: string;
    descricao: string;
    categoria: string;
    data_achado: string;
    localizacao_achado: { latitude: string, longitude: string };
    data_limite: string;
    valor_monetario: string;
    ativo: boolean;
    imageURL: string;
}

interface AuctionItem {
    id: number;
    objeto_achado_id: string;
    titulo: string; // Added to store object title
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
    const [dataFetched, setDataFetched] = useState(false);
    const [editingLostItemId, setEditingLostItemId] = useState<number | null>(null);
    const [editingFoundItemId, setEditingFoundItemId] = useState<number | null>(null);
    const [editingAuctionItemId, setEditingAuctionItemId] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const authFetch = useAuthFetch();

    useEffect(() => {
        if (!dataFetched) {
            const fetchData = async () => {
                try {
                    const lostItemsData = await authFetch(`${apiUrl}/users/mylostitems`);
                    setLostItems(lostItemsData);
                    setLoadingLostItems(false);
                } catch (error) {
                    console.error('Failed to fetch lost items:', error);
                    setLoadingLostItems(false);
                }
    
                try {
                    const foundItemsData = await authFetch(`${apiUrl}/police/items/found`);
                    setFoundItems(foundItemsData);
                    setLoadingFoundItems(false);
                } catch (error) {
                    console.error('Failed to fetch found items:', error);
                    setLoadingFoundItems(false);
                }
    
                try {
                    const auctionItemsData = await authFetch(`${apiUrl}/auctions/auctions`);
                    setAuctionItems(auctionItemsData);
                    setLoadingAuctionItems(false);
                } catch (error) {
                    console.error('Failed to fetch auction items:', error);
                    setLoadingAuctionItems(false);
                }
    
                setDataFetched(true);
            };
    
            fetchData();
        }
    }, [authFetch, dataFetched]);
    

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
                const response = await authFetch(`${apiUrl}/items/lost/${id}`, { method: 'DELETE' });
                if (response.message) {
                    setLostItems(lostItems.filter(item => item.id !== id));
                    setMessage(response.message);
                } else {
                    console.error('Failed to delete lost item');
                    setMessage('Failed to delete lost item');
                }
            } catch (error) {
                console.error('Error deleting data:', error);
                setMessage('Error deleting data');
            }
        }
    };

    const handleRemoveFoundItem = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await authFetch(`${apiUrl}/police/items/found/${id}`, { method: 'DELETE' });
                if (response.message) {
                    setFoundItems(foundItems.filter(item => item.id !== id));
                    setMessage(response.message);
                } else {
                    console.error('Failed to delete found item');
                    setMessage('Failed to delete found item');
                }
            } catch (error) {
                console.error('Error deleting data:', error);
                setMessage('Error deleting data');
            }
        }
    };

    const handleRemoveAuction = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this Auction?')) {
            try {
                const response = await authFetch(`${apiUrl}/auctions/auctions/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    setAuctionItems(auctionItems.filter(item => item.id !== id));
                    setMessage('Auction removed successfully');
                } else {
                    console.error('Failed to delete auction item');
                    setMessage('Failed to delete auction item');
                }
            } catch (error) {
                console.error('Error deleting data:', error);
                setMessage('Error deleting data');
            }
        }
    };

    const handleSaveLostItem = async (id: number, newData: LostItem) => {
        try {
            const response = await authFetch(`${apiUrl}/items/lost/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });
            if (response.message) {
                setLostItems(prevLostItems =>
                    prevLostItems.map(item => (item.id === id ? { ...item, ...newData } : item))
                );
                setEditingLostItemId(null);
                setMessage(response.message);
            } else {
                console.error('Failed to save lost item:', response.statusText);
                setMessage('Failed to save lost item');
            }
        } catch (error) {
            console.error('Failed to save lost item:', error);
            setMessage('Failed to save lost item');
        }
    };

    const handleSaveFoundItem = async (id: number, newData: FoundItem) => {
        try {
            const response = await authFetch(`${apiUrl}/police/items/found/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });
            if (response.message) {
                setFoundItems(prevFoundItems =>
                    prevFoundItems.map(item => (item.id === id ? { ...item, ...newData } : item))
                );
                setEditingFoundItemId(null);
                setMessage(response.message);
            } else {
                console.error('Failed to save found item');
                setMessage('Failed to save found item');
            }
        } catch (error) {
            console.error('Failed to save found item:', error);
            setMessage('Failed to save found item');
        }
    };

    const handleSaveAuctionItem = async (id: number, item: AuctionItem) => {
        try {
            const sanitizedData = {
                ativo: item.ativo,
                localizacao: item.localizacao.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
                dataInicio: item.data_inicio,
                dataFim: item.data_fim
            };
            const response = await authFetch(`${apiUrl}/auctions/auctions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sanitizedData),
            });
            if (response.message) {
                setAuctionItems(prevAuctionItems =>
                    prevAuctionItems.map(i => (i.id === id ? { ...i, ...sanitizedData } : i))
                );
                setEditingAuctionItemId(null);
                setMessage(response.message);
            } else {
                console.error('Failed to save auction item');
                setMessage('Failed to save auction item');
            }
        } catch (error) {
            console.error('Failed to save auction item:', error);
            setMessage('Failed to save auction item');
        }
    };

    if (loadingLostItems || loadingFoundItems || loadingAuctionItems) {
        return <div className='text-center mt-5 pt-5 h4'>A carregar...</div>;
    }

    return (
        <div className="SavedInfoPage">
            {message && <div className="message">{message}</div>}
            <h1>Objetos Perdidos</h1>
            <div className='ActiveLostItemTable'>
                <div className='grid-header'>
                    <div>Título</div>
                    <div>Descrição Curta</div>
                    <div>Descrição</div>
                    <div>Categoria</div>
                    <div>Data de quando foi perdido</div>
                    <div>Localização (Latitude)</div>
                    <div>Localização (Longitude)</div>
                    <div>Ativo</div>
                    <div>Editar</div>
                    <div>Remover</div>
                </div>
                {lostItems.map(item => (
                    <div key={item.id} className='grid-row'>
                        {editingLostItemId === item.id ? (
                            <>
                                <div><input type="text" defaultValue={item.titulo} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, titulo: e.target.value } : i))} /></div>
                                <div><input type="text" defaultValue={item.descricao_curta} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, descricao_curta: e.target.value } : i))} /></div>
                                <div><input type="text" defaultValue={item.descricao} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, descricao: e.target.value } : i))} /></div>
                                <div><input type="text" defaultValue={item.categoria} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, categoria: e.target.value } : i))} /></div>
                                <div><input type="date" defaultValue={item.data_perdido} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, data_perdido: e.target.value } : i))} /></div>
                                <div><input type="text" defaultValue={item.localizacao_perdido.latitude} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, localizacao_perdido: { ...i.localizacao_perdido, latitude: e.target.value } } : i))} /></div>
                                <div><input type="text" defaultValue={item.localizacao_perdido.longitude} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, localizacao_perdido: { ...i.localizacao_perdido, longitude: e.target.value } } : i))} /></div>
                                <div><input type="checkbox" checked={item.ativo} onChange={e => setLostItems(lostItems.map(i => i.id === item.id ? { ...i, ativo: e.target.checked } : i))} /></div>
                                <div><button onClick={() => handleSaveLostItem(item.id, item)}>Salvar</button></div>
                                <div><button onClick={() => handleRemoveLostItem(item.id)}>Remover</button></div>
                            </>
                        ) : (
                            <>
                                <div>{item.titulo}</div>
                                <div>{item.descricao_curta}</div>
                                <div>{item.descricao}</div>
                                <div>{item.categoria}</div>
                                <div>{item.data_perdido}</div>
                                <div>{item.localizacao_perdido.latitude}</div>
                                <div>{item.localizacao_perdido.longitude}</div>
                                <div><input type="checkbox" checked={item.ativo} readOnly /></div>
                                <div><button onClick={() => handleEditLostItem(item.id)}>Editar</button></div>
                                <div><button onClick={() => handleRemoveLostItem(item.id)}>Remover</button></div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <h1>Objetos Achados Ativos</h1>
            <div className='ActiveFoundItemTable'>
                <div className='grid-header'>
                    <div>Título</div>
                    <div>Descrição Curta</div>
                    <div>Descrição</div>
                    <div>Categoria</div>
                    <div>Data de quando foi encontrado</div>
                    <div>Localização (Latitude)</div>
                    <div>Localização (Longitude)</div>
                    <div>Data Limite</div>
                    <div>Valor Monetário</div>
                    <div>Imagem URL</div>
                    <div>Editar</div>
                    <div>Remover</div>
                </div>
                {foundItems.filter(item => item.ativo || item.id === editingFoundItemId).length === 0 ? (
                    <div className='grid-row'>Nenhum objeto achado ativo encontrado.</div>
                ) : (
                    foundItems.filter(item => item.ativo || item.id === editingFoundItemId).map(item => (
                        <div key={item.id} className='grid-row'>
                            {editingFoundItemId === item.id ? (
                                <>
                                    <div><input type="text" defaultValue={item.titulo} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, titulo: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.descricao_curta} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, descricao_curta: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.descricao} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, descricao: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.categoria} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, categoria: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_achado} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, data_achado: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.localizacao_achado.latitude} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, localizacao_achado: { ...i.localizacao_achado, latitude: e.target.value } } : i))} /></div>
                                    <div><input type="text" defaultValue={item.localizacao_achado.longitude} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, localizacao_achado: { ...i.localizacao_achado, longitude: e.target.value } } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_limite} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, data_limite: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.valor_monetario} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, valor_monetario: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.imageURL} onChange={e => setFoundItems(foundItems.map(i => i.id === item.id ? { ...i, imageURL: e.target.value } : i))} /></div>
                                    <div><button onClick={() => handleSaveFoundItem(item.id, item)}>Salvar</button></div>
                                    <div><button onClick={() => handleRemoveFoundItem(item.id)}>Remover</button></div>
                                </>
                            ) : (
                                <>
                                    <div>{item.titulo}</div>
                                    <div>{item.descricao_curta}</div>
                                    <div>{item.descricao}</div>
                                    <div>{item.categoria}</div>
                                    <div>{item.data_achado}</div>
                                    <div>{item.localizacao_achado.latitude}</div>
                                    <div>{item.localizacao_achado.longitude}</div>
                                    <div>{item.data_limite}</div>
                                    <div>{item.valor_monetario}</div>
                                    <div>{item.imageURL}</div>
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
                    <div>Ativo</div>
                    <div>Editar</div>
                    <div>Remover</div>
                </div>
                {auctionItems.filter(item => item.ativo || item.id === editingAuctionItemId).length === 0 ? (
                    <div className='grid-row'>Nenhum leilão ativo encontrado.</div>
                ) : (
                    auctionItems.filter(item => item.ativo || item.id === editingAuctionItemId).map(item => (
                        <div key={item.id} className='grid-row'>
                            {editingAuctionItemId === item.id ? (
                                <>
                                    <div>{item.titulo}</div>
                                    <div><input type="text" defaultValue={item.localizacao} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, localizacao: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_inicio.split('T')[0]} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, data_inicio: e.target.value } : i))} /></div>
                                    <div><input type="date" defaultValue={item.data_fim.split('T')[0]} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, data_fim: e.target.value } : i))} /></div>
                                    <div><input type="text" defaultValue={item.valor_base} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, valor_base: e.target.value } : i))} /></div>
                                    <div><input type="checkbox" checked={item.ativo} onChange={e => setAuctionItems(auctionItems.map(i => i.id === item.id ? { ...i, ativo: e.target.checked } : i))} /></div>
                                    <div><button onClick={() => handleSaveAuctionItem(item.id, item)}>Salvar</button></div>
                                    <div><button onClick={() => handleRemoveAuction(item.id)}>Remover</button></div>
                                </>
                            ) : (
                                <>
                                    <div>{item.titulo}</div>
                                    <div>{item.localizacao}</div>
                                    <div>{item.data_inicio.split('T')[0]}</div>
                                    <div>{item.data_fim.split('T')[0]}</div>
                                    <div>{item.valor_base}</div>
                                    <div><input type="checkbox" checked={item.ativo} readOnly /></div>
                                    <div><button onClick={() => handleEditAuctionItem(item.id)}>Editar</button></div>
                                    <div><button onClick={() => handleRemoveAuction(item.id)}>Remover</button></div>
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
