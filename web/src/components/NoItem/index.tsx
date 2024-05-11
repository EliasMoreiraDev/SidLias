import React from 'react';
import './styles.css';

interface NoItemProps {
  text: string;
}

const NoItem: React.FC<NoItemProps> = ({ text }) => {
  return (
    <div className='container_text'>
      <h2>{text}</h2>
    </div>
  );
}

export default NoItem;
