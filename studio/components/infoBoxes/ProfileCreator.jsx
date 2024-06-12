import React from 'react';

export default function ProfileCreator() {
  return (
    <div style={{
      border: '1px solid #ccc', 
      backgroundColor: '#f5f5f5', 
      padding: '20px', 
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3>Læs her:</h3>
      <p>
        Når du opretter denne profil, vil den blive tilknyttet til den e-mailadresse, du er logget ind med på Sanity. Dette sikrer, at kun brugere, der er logget ind med denne specifikke Sanity-profil, vil have mulighed for at skrive artikler under den.
      </p>
    </div>
  );
}
