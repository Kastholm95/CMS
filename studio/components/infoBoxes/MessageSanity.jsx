import React from 'react';

export default function MessageSanity() {
    return (
        <div style={{
          border: '1px solid #ccc', 
          backgroundColor: '#f5f5f5', 
          padding: '20px', 
          borderRadius: '8px',
          margin: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          color: '#333', 
          fontFamily: 'Arial, sans-serif', 
        }}>
          <h3>Nye Funktioner Implementeret </h3>
          <p>
            Der er indført automatiske opdateringer for at forbedre oplevelsem:
          </p>
          <ul>
            <li><strong>Auto Oprettelse af Slugs:</strong> Slugs oprettes automatisk, når artikler publiceres første gang. Så i slipper for at klikke Generer</li>
            <li><strong>Auto Tilknytning af Journalister:</strong> Journalisten tilknyttes automatisk baseret på den e-mail, der er logget ind med ved 1 Publish. Dette kan ændres manuelt nede i bunden, hvis nødvendigt.</li>
            <li><strong>Profil Sikkerhed:</strong> Kun profiler, der er logget på med den samme e-mail , kan skrive artikler, hvilket sikrer, at kun autoriserede brugere kan bidrage.</li>
          </ul>
          <p>
            Hvis i oplever problemer eller har spørgsmål, skriv/ring.
          </p>
        </div>
    );
}
