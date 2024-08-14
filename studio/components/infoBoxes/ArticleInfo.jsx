import React from 'react';
import { FaRegNewspaper, FaUserTie, FaCalendarAlt, FaEye, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useFormValue } from 'sanity';
import { useState, useEffect } from 'react';
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-03-25",
  useCdn: true,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});

function ArticleInfo() {
    const tagsArray = useFormValue(['tags', '_ref']);
    const title = useFormValue(['title']);
    const id = useFormValue(['_id']);
    const category = useFormValue(['category', '_ref']);
    const journalist = useFormValue(['journalist', '_ref']);
    const publishedAt = useFormValue(['publishedAt']);
    const isPublished = useFormValue(['isPublished']);
    const previewMode = useFormValue(['previewMode']);
    const views = useFormValue(['views']);
    const readingTime = useFormValue(['reading']);

    const [categoryName, setCategoryName] = useState('Loading category...');
    const [journalistName, setJournalistName] = useState('Loading journalist...');
    const [tagsNames, setTagsNames] = useState([]);

    useEffect(() => {
        if (category) {
            const query = `*[_type == "category" && _id == $id][0]{
                name
            }`;
            client.fetch(query, { id: category })
                .then(data => {
                    setCategoryName(data.name || 'Ingen kategori');
                })
                .catch(error => {
                    console.error("Error loading category", error);
                    setCategoryName('Ingen kategori');
                });
        } else {
            setCategoryName('Ingen kategori');
        }
    }, [category]);

     // Fetch journalist name
     useEffect(() => {
      if (journalist) {
          const query = `*[_type == "journalist" && _id == $id][0]{
              name
          }`;
          client.fetch(query, { id: journalist })
              .then(data => {
                  setJournalistName(data.name || 'Ingen journalist tildelt');
              })
              .catch(error => {
                  console.error("Error loading journalist", error);
                  setJournalistName('Ingen journalist tildelt');
              });
      } else {
          setJournalistName('Ingen journalist tildelt');
      }
  }, [journalist]);

  useEffect(() => {
    console.log(tagsArray, 'tagsArray');
    if (tagsArray && tagsArray.length > 0) {
        const ids = tagsArray.map(tag => tag._ref);  // Saml alle '_ref' værdier fra hvert tag objekt
        console.log(ids, 'ids');
        const query = `*[_type == "tag" && _id in $ids]{ name }`;
        client.fetch(query, { ids })
            .then(data => {
                console.log(data, 'data'); // Kontrol af hvad der returneres
                setTagsNames(data.map(tag => tag.name || 'Ukendt tag'));
            })
            .catch(error => {
                console.error("Error loading tags", error);
                setTagsNames(['Fejl ved indlæsning af tags']);
            });
    } else {
        setTagsNames([]);
    }
}, [tagsArray]);

    // Håndter datoformat
    const formattedDate = publishedAt ? new Date(publishedAt).toLocaleString("da-DK", {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  }) : 'Ikke publiceret';
  

    // Håndter udgivelsesstatus
    const publishStatus = isPublished ? 'Publiceringsdato' : 'Ikke publiceret';

    const data = [
      {
        title: 'Status',
        value: id.includes('drafts.') ? 'Draft mode' : previewMode ? 'Preview mode' : isPublished ? 'Publiceret' : 'Ikke Publiceret',
        Icon: previewMode ? FaEye : isPublished ? FaCheckCircle : FaTimesCircle,
        color: previewMode || id.includes('drafts.') ? 'orange' : isPublished ? 'green' : 'red',
      },
      {
        title: 'Publicering',
        value: publishedAt ? formattedDate : 'Ikke Publiceret',
        Icon: FaCalendarAlt,
        color: '#2a2a2a',
      },
      {title: 'Kategori', value: categoryName, Icon: FaRegNewspaper, color: '#2a2a2a'},
      {title: 'Journalist', value: journalistName, Icon: FaUserTie, color: '#2a2a2a'},
      {title: 'Besøg', value: views || '0', Icon: FaEye, color: '#2a2a2a'},
      {
        title: 'Læsetid',
        value: readingTime ? `${readingTime} min` : 'Unknown',
        Icon: FaClock,
        color: '#2a2a2a',
      },
    ]

    return (
      <div className='infoCards' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
      {data.map((item, index) => (
        <div key={index} style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: '10px'
        }}>
          <item.Icon style={{ fontSize: '16px', marginRight: '10px', color: item.color }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#646464', marginBottom: '5px' }}>{item.title}</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: item.color }}>{item.value}</div>
          </div>
        </div>
      ))}
    </div>
    );
  }
  
export default ArticleInfo;