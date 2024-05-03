import * as React from 'react';

import { Link } from 'react-router-dom';

import './styles.css'




interface PageHeaderProps{
    title:string;
    children?:React.ReactNode;
    description?:string
}

const PageHeader:React.FC<PageHeaderProps> = (props) => {
    return(
        
            <header className='page-header'>
                <div className="top-bar-container">
                    <Link to={'/'}>
                       <h1>Voltar</h1>
                    </Link>
                    {/* <img src={logoImg} alt="" /> */}
                </div>
                <div className='header-content'>
                    <strong>{props.title}</strong>

                    {props.description && <p>{props.description}</p>}

                </div>
                {props.children}
            </header>
    )
}
export default PageHeader