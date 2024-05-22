import React from 'react';

const IframeWrapper = ({type, value, onChange}) => {
  const handleChange = (event) => {
    const inputValue = event.target.value;
    onChange(inputValue); // Opdater værdien
  };

  return (
    <textarea
      value={value || ''}
      onChange={handleChange}
      rows={10}
      placeholder="Indsæt iframe-kode her..."
    />
  );
};

export default IframeWrapper;