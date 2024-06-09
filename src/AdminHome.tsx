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
  genero: string;
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
        if (response.ok) {
          setSuccessMessage('Successfully deleted');
          if (type === 'members') {
            setMembers(members.filter(member => member.id !== id));
          } else {
            setPostosPolicia(postosPolicia.filter(posto => posto.id !== id));
          }
        } else {
          setError('Failed to delete');
        }
      } catch (error) {
        console.error("Error deleting data:", error);
        setError('Failed to delete');
      }
    }
  };

  const handleSave = async (id: number, type: 'members' | 'posts', data: Member | PostoPolicia) => {
    try {
      const response = await authFetch(`${config.API_BASE_URL}/police/${type}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setSuccessMessage('Successfully updated');
        if (type === 'members') {
          setMembers(members.map(member => (member.id === id ? data as Member : member)));
        } else {
          setPostosPolicia(postosPolicia.map(posto => (posto.id === id ? data as PostoPolicia : posto)));
        }
        setEditingMemberId(null);
        setEditingPostoId(null);
      } else {
        setError('Failed to update');
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setError('Failed to update');
    }
  };

  const handleAddMember = () => {
    setNewMember({
      nome: '',
      posto_policia: 0,
      morada: '',
      telemovel: '',
      email: '',
      genero: '',
      data_nasc: '',
      historico_policia: { yearsService: 0, commendations: [] }
    });
  };

  const handleAddPosto = () => {
    setNewPosto({ morada: '' });
  };

  const handleSaveNew = async (type: 'members' | 'posts', data: Partial<Member> | Partial<PostoPolicia>) => {
    try {
      const response = await authFetch(`${config.API_BASE_URL}/police/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setSuccessMessage('Successfully added');
        const newData = await response.json();
        if (type === 'members') {
          setMembers([...members, newData as Member]);
        } else {
          setPostosPolicia([...postosPolicia, newData as PostoPolicia]);
        }
        setNewMember(null);
        setNewPosto(null);
      } else {
        setError('Failed to add');
      }
    } catch (error) {
      console.error("Error adding data:", error);
      setError('Failed to add');
    }
  };

  const handleFieldChange = (field: keyof Member, value: any) => {
    if (newMember) {
      setNewMember({
        ...newMember,
        [field]: value
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='Pagina'>
      {successMessage && <div className='SuccessMessage'>{successMessage}</div>}

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
          <div>Genero</div>
          <div>Years of Service</div>
          <div>Commendations</div>
          <div>Editar</div>
          <div>Remover</div>
        </div>

        {members.map((member) => (
          <div key={member.id} className="grid-row">
            {editingMemberId === member.id ? (
              <>
                <div><input type="text" defaultValue={member.nome} /></div>
                <div>
                  <select defaultValue={member.posto_policia}>
                    {postosPolicia.map(post => (
                      <option key={post.id} value={post.id}>{post.morada}</option>
                    ))}
                  </select>
                </div>
                <div><input type="text" defaultValue={member.morada} /></div>
                <div><input type="text" defaultValue={member.telemovel} /></div>
                <div><input type="text" defaultValue={member.email} /></div>
                <div><input type="date" defaultValue={member.data_nasc?.split('T')[0]} /></div>
                <div><input type="text" defaultValue={member.genero} /></div>
                <div><input type="number" defaultValue={member.historico_policia.yearsService} /></div>
                <div><input type="text" defaultValue={member.historico_policia.commendations.join(', ')} /></div>
                <div><button onClick={() => handleSave(member.id, 'members', member)}>Apply</button></div>
                <div><button onClick={() => handleRemove(member.id, 'members')}>Remover</button></div>
              </>
            ) : (
              <>
                <div>{member.nome}</div>
                <div>{postosPolicia.find(post => post.id === member.posto_policia)?.morada}</div>
                <div>{member.morada}</div>
                <div>{member.telemovel}</div>
                <div>{member.email}</div>
                <div>{member.data_nasc?.split('T')[0]}</div>
                <div>{member.genero}</div>
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
            <div><input type="text" placeholder="Nome" onChange={(e) => handleFieldChange('nome', e.target.value)} /></div>
            <div>
              <select onChange={(e) => handleFieldChange('posto_policia', e.target.value)}>
                <option value="" disabled>Select Posto</option>
                {postosPolicia.map(post => (
                  <option key={post.id} value={post.id}>{post.morada}</option>
                ))}
              </select>
            </div>
            <div><input type="text" placeholder="Morada" onChange={(e) => handleFieldChange('morada', e.target.value)} /></div>
            <div><input type="text" placeholder="Telemovel" onChange={(e) => handleFieldChange('telemovel', e.target.value)} /></div>
            <div><input type="text" placeholder="Email" onChange={(e) => handleFieldChange('email', e.target.value)} /></div>
            <div><input type="date" placeholder="Data Nascimento" onChange={(e) => handleFieldChange('data_nasc', e.target.value)} /></div>
            <div><input type="text" placeholder="Genero" onChange={(e) => handleFieldChange('genero', e.target.value)} /></div>
            <div><input type="number" placeholder="Years of Service" onChange={(e) => handleFieldChange('historico_policia', { ...newMember?.historico_policia, yearsService: e.target.value })} /></div>
            <div><input type="text" placeholder="Commendations" onChange={(e) => handleFieldChange('historico_policia', { ...newMember?.historico_policia, commendations: e.target.value.split(', ') })} /></div>
            <div><button onClick={() => handleSaveNew('members', newMember)}>Apply</button></div>
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
                <div><input type="text" defaultValue={posto.morada} /></div>
                <div><button onClick={() => handleSave(posto.id, 'posts', posto)}>Apply</button></div>
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
            <div><input type="text" placeholder="Morada" onChange={(e) => setNewPosto({ ...newPosto, morada: e.target.value })} /></div>
            <div><button onClick={() => handleSaveNew('posts', newPosto)}>Apply</button></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
