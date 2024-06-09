import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import { useNavigate } from 'react-router-dom';

import config from './apiconfig';
import useAuthFetch from './hooks/useAuthFetch';

interface Member {
  id: number;
  nome: string;
  posto_policia: number;
  morada: string;
  telemovel: string;
  email: string;
  data_nasc: string;
  historico_policia: {
    yearsService: number;
    commendations: string[];
  };
}

interface PostoPolicia {
  id: number;
  morada: string;
}

interface Posto {
  id: number;
  nome: string;
}

const AdminHome: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [postosPolicia, setPostosPolicia] = useState<PostoPolicia[]>([]);
  const [posts, setPosts] = useState<Posto[]>([]);
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);
  const [editingPostoId, setEditingPostoId] = useState<number | null>(null);
  const [newMember, setNewMember] = useState<Partial<Member> | null>(null);
  const [newPosto, setNewPosto] = useState<Partial<PostoPolicia> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const authFetch = useAuthFetch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersData = await authFetch(`${config.API_BASE_URL}/police/members`);
        const postsData = await authFetch(`${config.API_BASE_URL}/police/posts`);

        console.log("Members Data: ", membersData);
        console.log("Posts Data: ", postsData);

        setMembers(membersData);
        setPosts(postsData);
        setPostosPolicia(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Failed to fetch data');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleEditMember = (id: number) => {
    setEditingMemberId(id);
  };

  const handleEditPosto = (id: number) => {
    setEditingPostoId(id);
  };

  const handleRemove = async (id: number, type: 'members' | 'posts') => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await authFetch(`${config.API_BASE_URL}/police/${type}/${id}`, { method: 'DELETE' });
        const result = await response;
        if (response.ok) {
          setSuccessMessage('Successfully deleted');
          if (type === 'members') {
            setMembers(members.filter(member => member.id !== id));
          } else {
            setPosts(posts.filter(post => post.id !== id));
            setPostosPolicia(postosPolicia.filter(posto => posto.id !== id));
          }
        } else {
          setError(result.message || 'Failed to delete');
        }
      } catch (error) {
        console.error("Error deleting data:", error);
        setError('Failed to delete');
      }
    }
  };

  const handleSaveMember = async (id: number, data: Member) => {
    try {
      const response = await authFetch(`${config.API_BASE_URL}/police/members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setSuccessMessage('Successfully updated');
        setMembers(members.map(member => (member.id === id ? data : member)));
        setEditingMemberId(null);
      } else {
        const result = await response;
        setError(result.message || 'Failed to update');
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setError('Failed to update');
    }
  };

  const handleSavePostoPolicia = async (id: number, data: PostoPolicia) => {
    try {
      const response = await authFetch(`${config.API_BASE_URL}/police/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setSuccessMessage('Successfully updated');
        setPostosPolicia(postosPolicia.map(posto => (posto.id === id ? data : posto)));
        setEditingPostoId(null);
      } else {
        const result = await response;
        setError(result.message || 'Failed to update');
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setError('Failed to update');
    }
  };

  const handleAddMember = () => {
    setNewMember({});
  };

  const handleAddPosto = () => {
    setNewPosto({});
  };

  const handleSaveNewMember = async (data: Partial<Member>) => {
    try {
      const response = await authFetch(`${config.API_BASE_URL}/police/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const newData = await response;
        setSuccessMessage('Successfully added');
        setMembers([...members, newData as Member]);
        setNewMember(null);
      } else {
        const result = await response;
        setError(result.message || 'Failed to add');
      }
    } catch (error) {
      console.error("Error adding data:", error);
      setError('Failed to add');
    }
  };

  const handleSaveNewPosto = async (data: Partial<PostoPolicia>) => {
    try {
      const response = await authFetch(`${config.API_BASE_URL}/police/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response;
      if (response.ok) {
        setSuccessMessage('Successfully added');
        setPostosPolicia([...postosPolicia, result as PostoPolicia]);
        setNewPosto(null);
      } else {
        setError(result.message || 'Failed to add');
      }
    } catch (error) {
      console.error("Error adding data:", error);
      setError('Failed to add');
    }
  };

  const closeErrorPopup = () => {
    setError(null);
  };

  const closeSuccessPopup = () => {
    setSuccessMessage('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Pagina'>
      {successMessage && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeSuccessPopup}>&times;</span>
            <p>{successMessage}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeErrorPopup}>&times;</span>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className='DivHeader-Policias'>
        <h1>Policias</h1>
        <button onClick={handleAddMember}>Adicionar</button>
      </div>

      <div className="grid-Policias">
        <div className="grid-header">
          <div>Nome</div>
          <div>Posto Policia</div>
          <div>Morada</div>
          <div>Telemovel</div>
          <div>Email</div>
          <div>Data Nascimento</div>
          <div>Historico Anos</div>
          <div>Historico Comendas</div>
          <div>Editar</div>
          <div>Remover</div>
        </div>

        {members.map((member) => (
          <div key={member.id} className="grid-row">
            {editingMemberId === member.id ? (
              <>
                <div><input type="text" defaultValue={member.nome} onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, nome: e.target.value } : m))} /></div>
                <div>
                  <select defaultValue={member.posto_policia} onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, posto_policia: Number(e.target.value) } : m))}>
                    {posts.map(post => (
                      <option key={post.id} value={post.id}>{post.nome}</option>
                    ))}
                  </select>
                </div>
                <div><input type="text" defaultValue={member.morada} onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, morada: e.target.value } : m))} /></div>
                <div><input type="text" defaultValue={member.telemovel} onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, telemovel: e.target.value } : m))} /></div>
                <div><input type="text" defaultValue={member.email} onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, email: e.target.value } : m))} /></div>
                <div><input type="date" defaultValue={member.data_nasc?.split('T')[0]} onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, data_nasc: e.target.value } : m))} /></div>
                <div><input type="text" defaultValue={member.historico_policia.yearsService} onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, historico_policia: { ...m.historico_policia, yearsService: Number(e.target.value), commendations: m.historico_policia.commendations || [] } } : m))} /></div>
                <div><input type="text" defaultValue={member.historico_policia.commendations.join(', ')} onChange={(e) => setMembers(members.map(m => m.id === member.id ? { ...m, historico_policia: { ...m.historico_policia, yearsService: m.historico_policia.yearsService || 0, commendations: e.target.value.split(', ') } } : m))} /></div>
                <div><button onClick={() => { handleSaveMember(member.id, member); setEditingMemberId(null); }}>Apply</button></div>
                <div><button onClick={() => handleRemove(member.id, 'members')}>Remover</button></div>
              </>
            ) : (
              <>
                <div>{member.nome}</div>
                <div>{posts.find(post => post.id === member.posto_policia)?.nome}</div>
                <div>{member.morada}</div>
                <div>{member.telemovel}</div>
                <div>{member.email}</div>
                <div>{member.data_nasc?.split('T')[0]}</div>
                <div>{member.historico_policia.yearsService}</div>
                <div>{member.historico_policia.commendations.join(', ')}</div>
                <div><button onClick={() => handleEditMember(member.id)}>Editar</button></div>
                <div><button onClick={() => handleRemove(member.id, 'members')}>Remover</button></div>
              </>
            )}
          </div>
        ))}

        {newMember && (
          <div className="grid-row">
            <div><input type="text" placeholder="Nome" value={newMember.nome || ''} onChange={e => setNewMember({...newMember, nome: e.target.value})} /></div>
            <div>
              <select value={newMember.posto_policia || ''} onChange={e => setNewMember({...newMember, posto_policia: Number(e.target.value)})}>
                <option value="" disabled>Select Posto</option>
                {posts.map(post => (
                  <option key={post.id} value={post.id}>{post.nome}</option>
                ))}
              </select>
            </div>
            <div><input type="text" placeholder="Morada" value={newMember.morada || ''} onChange={e => setNewMember({...newMember, morada: e.target.value})} /></div>
            <div><input type="text" placeholder="Telemovel" value={newMember.telemovel || ''} onChange={e => setNewMember({...newMember, telemovel: e.target.value})} /></div>
            <div><input type="text" placeholder="Email" value={newMember.email || ''} onChange={e => setNewMember({...newMember, email: e.target.value})} /></div>
            <div><input type="date" placeholder="Data Nascimento" value={newMember.data_nasc || ''} onChange={e => setNewMember({...newMember, data_nasc: e.target.value})} /></div>
            <div><input type="text" placeholder="Historico Anos" value={newMember.historico_policia?.yearsService || ''} onChange={e => setNewMember({...newMember, historico_policia: {...newMember.historico_policia, yearsService: Number(e.target.value), commendations: newMember.historico_policia?.commendations || []}})} /></div>
            <div><input type="text" placeholder="Historico Comendas" value={newMember.historico_policia?.commendations.join(', ') || ''} onChange={e => setNewMember({...newMember, historico_policia: {...newMember.historico_policia, yearsService: newMember.historico_policia?.yearsService || 0, commendations: e.target.value.split(', ')}})} /></div>
            <div><button onClick={() => { handleSaveNewMember(newMember); setNewMember(null); }}>Apply</button></div>
          </div>
        )}
      </div>

      <div className='DivHeader-PostosPolicia'>
        <h1>Postos de Policia</h1>
        <button onClick={handleAddPosto}>Adicionar</button>
      </div>

      <div className="grid-PostosPolicia">
        <div className="grid-header">
          <div>Morada</div>
          <div>Editar</div>
          <div>Remover</div>
        </div>

        {postosPolicia.map((posto) => (
          <div key={posto.id} className="grid-row">
            {editingPostoId === posto.id ? (
              <>
                <div><input type="text" defaultValue={posto.morada} onChange={(e) => setPostosPolicia(postosPolicia.map(p => p.id === posto.id ? { ...p, morada: e.target.value } : p))} /></div>
                <div><button onClick={() => { handleSavePostoPolicia(posto.id, posto); setEditingPostoId(null); }}>Apply</button></div>
                <div><button onClick={() => handleRemove(posto.id, 'posts')}>Remover</button></div>
              </>
            ) : (
              <>
                <div>{posto.morada}</div>
                <div><button onClick={() => handleEditPosto(posto.id)}>Editar</button></div>
                <div><button onClick={() => handleRemove(posto.id, 'posts')}>Remover</button></div>
              </>
            )}
          </div>
        ))}

        {newPosto && (
          <div className="grid-row">
            <div><input type="text" placeholder="Morada" value={newPosto.morada || ''} onChange={e => setNewPosto({...newPosto, morada: e.target.value})} /></div>
            <div><button onClick={() => { handleSaveNewPosto(newPosto); setNewPosto(null); }}>Apply</button></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
