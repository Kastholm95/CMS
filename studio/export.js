const fs = require('fs'); // Inkludér fs-modulet

/* const query = `*[_type == "article"] | order(_createdAt desc) [0...1] {
           _id,
           publishedAt,
           title,
           "slug": slug.current,
           "newSlug": newSlug.current,
           "oldSlugs": oldSlugs[], 
           republishArticle,
           "category": category->name,
           "tag": tag[]->name,
           "JournalistName": journalist->name
}`;  */
/* const query = `*[_type == "article"] [0...100] {
  name,
}`;

const apiURL = `https://ikbzpczn.api.sanity.io/v1/data/query/production?query=${encodeURIComponent(query)}`;

fetch(apiURL)
  .then(response => response.json())
  .then(data => {

    const jsonContent = JSON.stringify(data.result, null, 2);

    // Skriv hele dataobjektet til en JSON-fil
    fs.writeFile('articles.json', jsonContent, 'utf8', (err) => {
      if (err) {
        console.log('En fejl opstod under skrivning af filen:', err);
      } else {
        console.log('Data er blevet gemt som articles.json');
      }
    });
  })
  .catch(error => console.error('Error fetching articles:', error)); */




/*   const query = `*[_type == "tag"] {
    "tag": tag->name,
  }`;
  
  const apiURL = `https://ikbzpczn.api.sanity.io/v1/data/query/production?query=${encodeURIComponent(query)}`;
  
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const names = data.result.map(item => item.title).join('\n');
      
      // Udskriv navnene direkte i et format, du kan kopiere
      console.log(names);
  
      // Du kan også gemme navnene til en fil, hvis det er nødvendigt
      const fs = require('fs');
      fs.writeFile('names.txt', names, ',', 'john', 'utf8', (err) => {
        if (err) {
          console.log('En fejl opstod under skrivning af filen:', err);
        } else {
          console.log('Navne er blevet gemt som names.txt');
        }
      });
    })
    .catch(error => console.error('Error fetching articles:', error)); */

/*     const query = `*[_type == "tag"] {
      name,
    }`;
    
    const apiURL = `https://ikbzpczn.api.sanity.io/v1/data/query/production?query=${encodeURIComponent(query)}`;
    
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        // Generer RDF/XML-struktur for hvert tag, og erstatter mellemrum med underscores
        const rdfXML = data.result.map(item => `
    <owl:NamedIndividual rdf:about="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#${item.name.replace(/\s+/g, '')}">
      <rdf:type rdf:resource="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#Tag"/>
    </owl:NamedIndividual>
        `).join('\n');
    
        // Udskriv RDF/XML-formateret data til konsollen
        console.log(rdfXML);
    
        // Gem RDF/XML data til en fil, hvis det er nødvendigt
        const fs = require('fs');
        fs.writeFile('tags.rdf', rdfXML, 'utf8', (err) => {
          if (err) {
            console.log('En fejl opstod under skrivning af filen:', err);
          } else {
            console.log('Tags er blevet gemt som tags.rdf');
          }
        });
      })
      .catch(error => console.error('Error fetching tags:', error)); */
    
    

      const query = `*[_type == "article"] | order(_createdAt desc) {
        _id,
        publishedAt,
        title,
        "slug": slug.current,
        "newSlug": newSlug.current,
        "oldSlugs": oldSlugs[], 
        republishArticle,
        "category": category->name,
        "tag": tag[]->name,
        "JournalistName": journalist->name,
        isPublished
      }`;  
      
      const apiURL = `https://ikbzpczn.api.sanity.io/v1/data/query/production?query=${encodeURIComponent(query)}`;
      
      fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          // Generer RDF/XML-struktur for hvert element
          const rdfXML = data?.result.map(item => {
            const id = item?._id ? (
              `<ontologi:hasID rdf:datatype="http://www.w3.org/2001/XMLSchema#string">${item._id}</ontologi:hasID>`
            ) : '';
      
            const articleType = item.republishArticle ? (
              `<rdf:type rdf:resource="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#PublishedArticle"/>
               <rdf:type rdf:resource="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#RepublishedArticle"/>`
            ) : item.isPublished ? (
              `<rdf:type rdf:resource="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#PublishedArticle"/>`
            ) : (
              `<rdf:type rdf:resource="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#NotPublishedArticle"/>`
            );
      
            const tag = item?.tag ? (
              item.tag.map(tag => `<ontologi:hasTag rdf:resource="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#${tag.replace(/\s+/g, '_')}"/>
            `).join('\n')
            ) : `
              <rdf:type rdf:resource="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#ArticleWithoutTag"/>
            `;
      
            const category = item?.category ? (
              `<ontologi:hasCategory rdf:resource="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#${item.category.replace(/\s+/g, '_')}"/>`
            ) : `<rdf:type rdf:resource="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#ArticleWithoutCategory"/>`;
      
            const journalist = item?.JournalistName ? (
              `<ontologi:hasJournalist rdf:resource="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#${item.JournalistName.replace(/\s+/g, '_')}"/>`
            ) : `<rdf:type rdf:resource="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#ArticleWithoutJournalist"/>`;
      
            const newSlug = item?.newSlug ? (
              `<ontologi:hasNewSlug rdf:datatype="http://www.w3.org/2001/XMLSchema#string">${item.newSlug.replace(/\s+/g, '_')}</ontologi:hasNewSlug>`
            ) : '';
      
            const oldSlugs = item?.oldSlugs ? (
              item.oldSlugs.map(oldSlug => `<ontologi:hasOldSlugs rdf:datatype="http://www.w3.org/2001/XMLSchema#string">${oldSlug.replace(/\s+/g, '_')}</ontologi:hasOldSlugs>`
            ).join('\n')
            ) : '';
      
            const publishedAt = item?.publishedAt ? (() => {
              const date = new Date(item.publishedAt);
          
              // Formattering til 'yyyy-mm-ddThh:mm:ss' (ISO 8601-format)
              const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
          
              return `<ontologi:publishedAt rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">${formattedDate}</ontologi:publishedAt>`;
          })() : '';
          
          
      
            return `
            <owl:NamedIndividual rdf:about="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#${item?.slug?.replace(/\s+/g, '_')}">
              <rdf:type rdf:resource="http://www.semanticweb.org/marc/ontologies/2024/8/pengehjoernetXML#Article"/>
              ${id}
              ${articleType}
              ${publishedAt}
              ${category}
              ${journalist}
              ${tag}
              ${newSlug}
              ${oldSlugs}
            </owl:NamedIndividual>`;
          }).join('\n');
      
          // Udskriv RDF/XML-formateret data til konsollen
          console.log(rdfXML);
      
          // Gem RDF/XML data til en fil, hvis det er nødvendigt
          const fs = require('fs');
          fs.writeFile('tags.rdf', rdfXML, 'utf8', (err) => {
            if (err) {
              console.log('En fejl opstod under skrivning af filen:', err);
            } else {
              console.log('Tags er blevet gemt som tags.rdf');
            }
          });
        })
        .catch(error => console.error('Error fetching tags:', error));
      
