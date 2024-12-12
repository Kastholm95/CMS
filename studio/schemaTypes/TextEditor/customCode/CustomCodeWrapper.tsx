import React from 'react';
import { FaEdit, FaPlayCircle } from 'react-icons/fa';

const CustomCodeWrapper = () => {

  return (
      <div style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: '10px',
        borderRadius: '5px',
      }}>
        
        <button style={{
           backgroundColor: '#5fb0cf',
           color: '#fff',
           border: 'none',
           borderRadius: '5px',
           padding: '10px 15px',
           fontSize: '16px',
           fontWeight: '500',
           cursor: 'pointer',
        }}><FaPlayCircle style={{ fontSize: '20px', marginRight: '5px', marginBottom: '-5px' }} />Dobbeltklik</button>
        <h4 style={{ margin: 0, fontWeight: 'normal' }}> Eller flyt HTML koden rundt i artiklen med musen</h4>
      </div>
  );
};

export default CustomCodeWrapper;