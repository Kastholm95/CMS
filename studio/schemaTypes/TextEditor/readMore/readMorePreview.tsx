
import { FaEdit } from "react-icons/fa";
interface Article {
  _id: string
  title: string
}

interface ReadMoreProps {
  articles: Article[];
  _id: string;
}

export function readMorePreview() {
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
    }}><FaEdit style={{ fontSize: '20px', marginRight: '5px' }} />Dobbeltklik</button>
    <h4 style={{ margin: 0, fontWeight: 'normal' }}> Eller flyt artiklerne rundt i artiklen med musen</h4>
  </div>
  )
}




/* default async  */ 
/* import { client } from '../../../lib/sanity' */
/* async function getData() {
      const query = `*[_type == "article" && _id in $articleIds]`;
      const params = { articleIds: articles.map(article => article._id) }; // Mapper `articles` til en array af IDs
      const data = await client.fetch(query);
      return data;
    }
  
    const data: Article[] = await getData(); */
