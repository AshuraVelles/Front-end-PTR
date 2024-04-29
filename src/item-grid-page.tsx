import React from 'react';
import Grid from './Components/item-grid'; 
import './Base-page.css';




const ItemGridPage: React.FC = () => {

  const items = [
    { id: 1, title: 'Item 1', imageUrl: 'https://i.pinimg.com/736x/0f/62/65/0f6265fe8dc448b8f032f161db77c033.jpg' },
    { id: 2, title: 'Item 2', imageUrl: 'https://e7.pngegg.com/pngimages/414/624/png-clipart-brand-black-and-white-angle-number-2-text-monochrome.png' },
    { id: 3, title: 'Item 3', imageUrl: 'https://i.pinimg.com/736x/c0/a0/07/c0a0077f1c0cae02626f8f8281f0df35.jpg' },
    { id: 4, title: 'Item 4', imageUrl: 'https://i.pinimg.com/736x/2c/94/7b/2c947bcaf6ca4b1c37f44f9cff180d01.jpg' },
    { id: 5, title: 'Item 5', imageUrl: 'https://www.edding.com/fileadmin/templates/templates-numbers/template-number-5.svg' },
    { id: 6, title: 'Item 6', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNpJDRT2XC31d0Lp8Qv6x8hqzSLR29XGcFr45UpFgHg&s' },
    { id: 7, title: 'Item 7', imageUrl: 'https://i.pinimg.com/736x/b3/62/e8/b362e8f550bf78fdc31d5be61e947d2c.jpg' },
    { id: 8, title: 'Item 8', imageUrl: 'https://www.edding.com/fileadmin/templates/templates-numbers/template-number-8.svg' },
    { id: 9, title: 'Item 9', imageUrl: 'https://i.pinimg.com/736x/5c/9e/e2/5c9ee2ce76b7f2892d27a4c4ee203639.jpg' },
    { id: 10, title: 'Item 10', imageUrl: 'https://i.pinimg.com/736x/5a/c8/60/5ac860cd11944e92c11858ff89121c1e.jpg' },
  ];



  return (

    <div className="Page-container">
      <div className="Page-company-name">RCA</div>
      <div className="Page-welcome-text">Objetos encontrados</div>
      <div className="Page-box">
    <div className="grid">
      <h1>List of items</h1>
      <Grid items={items} />
    </div>
    </div>


    </div>
  );
};

export default ItemGridPage;