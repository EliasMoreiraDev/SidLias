import * as React from 'react';

import { Link } from 'react-router-dom';

import './styles.css'

import backIcon from '../../assets/images/icons/back.svg'
import { link } from 'fs';


interface PageHeaderProps{
    title:string;
    children?:React.ReactNode;
    funcionalidade?:React.ReactNode;
    description?:string,
    link: string
}

const PageHeader:React.FC<PageHeaderProps> = (props) => {
    return(
        
            <header className='page-header'>
                <div className="top-bar-container">
                    <Link to={props.link}>
                       <img src={backIcon} alt="" />
                    </Link>
                    {props.funcionalidade}
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