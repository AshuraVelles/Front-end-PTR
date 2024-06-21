import React from 'react';
import './AllSavedStuffUser.css'




const SavedInfo: React.FC = () => {

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
        <div className='grid-row'>
            <div>Lost example Name</div> 
            <div>Lost example Category</div> 
            <div>Lost example Date</div>
            <div><button>Detalhes</button></div>
            <div><button>Editar</button></div>
            <div><button>Remover</button></div>
        </div>
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
        <div className='grid-row'>
            <div>Found example Name</div> 
            <div>Found example Category</div> 
            <div>Found example Date</div>
            <div>Found example Deadline</div>
            <div>Found example Value</div>
            <div><button>Detalhes</button></div>
            <div><button>Editar</button></div>
            <div><button>Remover</button></div>
        </div>
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
        <div className='grid-row'>
            <div>Auction example Name</div> 
            <div>Auction example location</div> 
            <div>Auction example starting date</div>
            <div>Auction example ending date</div>
            <div>Auction example starting value</div>
            <div>Auction example current value</div>
            <div><button>Detalhes</button></div>
            <div><button>Editar</button></div>
            <div><button>Remover</button></div>
        </div>
        </div>

        <h1>Objetos Perdidos Inativos</h1>
        <div className='InactiveLostItemTable'>
        <div className='grid-header'>
            <div>Nome/Descrição curta</div> 
            <div>Categoria</div> 
            <div>Data de quando foi perdido</div>
            <div>Detalhes</div>
        </div>
        <div className='grid-row'>
            <div>Lost example Name</div> 
            <div>Lost example Category</div> 
            <div>Lost example Date</div>
            <div><button>Detalhes</button></div>

        </div>
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
        <div className='grid-row'>
            <div>Found example Name</div> 
            <div>Found example Category</div> 
            <div>Found example Date</div>
            <div>Found example Deadline</div>
            <div>Found example Value</div>
            <div><button>Detalhes</button></div>

        </div>
        </div>
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
        <div className='grid-row'>
            <div>Auction example Name</div> 
            <div>Auction example location</div> 
            <div>Auction example starting date</div>
            <div>Auction example ending date</div>
            <div>Auction example starting value</div>
            <div>Auction example current value</div>
            <div><button>Detalhes</button></div>
        </div>
        </div>

        </div>
    );

}

export default SavedInfo;
