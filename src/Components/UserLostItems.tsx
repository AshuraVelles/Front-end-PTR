// src/components/UserLostItems.tsx
import React from 'react';
import { ItemsProvider, useItems } from './ItemsProvider';

const UserLostItems: React.FC = () => {
  const { items, isLoading, error } = useItems();

  if (isLoading) {
    return <div className='text-center mt-5 pt-5 h4'>A carregar...</div>;
  }

  if (error) {
    return <div className='text-center mt-5 pt-5 h4'>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Meus Itens Perdidos</h1>
      {items.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.descricao}</p>
          <img src={item.imageurl} alt={item.title} />
        </div>
      ))}
    </div>
  );
};

const UserLostItemsPage: React.FC = () => {
  return (
    <ItemsProvider type="lost">
      <UserLostItems />
    </ItemsProvider>
  );
};

export default UserLostItemsPage;
