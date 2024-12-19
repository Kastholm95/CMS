import React from 'react'
import {defineField, defineType} from 'sanity'
import {IoNewspaperOutline as icon} from 'react-icons/io5'
import ArticleInfo from '../../../components/infoBoxes/ArticleInfo'

export default {
  name: 'msnScrollFeed',
  title: 'Feeds',
  type: 'document',
  fields: [
    {
      name: 'views',
      title: 'Page View Counter (Beta)',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      hidden: true,
    },
    {
      name: 'title',
      title: 'Feed Titel',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      type: 'imageWithMetadata',
      name: 'metaImage',
      title: 'Billede & metadata',
      description:
        'Tilføj et nyt billede, som repræsenterer artiklen. Billedet bruges til at repræsentere artiklen på forsiden og på sociale medier. Du kan uploade, copy paste, vælge forhenværende billede, eller klikke på "Vælg" og bruge en indbygget version af Pexels eller Unsplash',
      options: {
        requiredFields: ['description'],
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Kort beskrivelse af Feed',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
          title: 'Artiklens kategori',
          type: 'reference',
          description: 'Tilføj kategori til artiklen, eller tilføj et nyt',
          to: [{ type: 'category' }],
          validation: (Rule: any) => Rule.required().error('Du skal vælge en kategori'),
    },{
          name: 'tag',
          title: 'Artiklens tags',
          type: 'array',
          description: 'Tilføj tag/tags til artiklen',
          of: [{type: 'reference', to: [{type: 'tag'}]}],
          validation: (Rule: any) =>
            Rule.required().min(1).max(10).error('Du må vælge mindst 1 tag, og maksimalt 10 tags'),
        },
    {
      name: 'journalist',
      title: 'Journalist af artiklen',
      type: 'reference',
      description: 'Vælg journalisten som har skrevet artiklen',
      to: [{type: 'journalist'}],
    },
    {
      name: 'previewMode',
      title: 'Preview Mode',
      type: 'boolean',
      description: "Ønsker du at se artiklen i preview mode inden den udgives live? Aktiver denne og se artiklen på admin siden. Når du er klar til at publicere, kan du deaktivere preview mode og publicere artiklen - tilret evt. publiceringsdatoen så den passer med det præcise udgivelsestidspunkt.",
      initialValue: false,
      hidden: true,
    },
    {
      name: 'articles',
      title: 'Tilføj artikler',
      type: 'array',
      description: 'Tilføj 4 til 20 artikler der skal indgå i feedet.',
      of: [
        {
          type: 'object',
          name: 'articleBlock',
          title: 'Artikel Blok',
          fields: [
            {
              type: 'imageWithMetadata',
              name: 'subImage',
              title: 'Billede & metadata',
              description:
                'Tilføj et nyt billede, som repræsenterer artiklen. Billedet bruges til at repræsentere artiklen på forsiden og på sociale medier. Du kan uploade, copy paste, vælge forhenværende billede, eller klikke på "Vælg" og bruge en indbygget version af Pexels eller Unsplash',
              options: {
                requiredFields: ['description'],
                hotspot: true,
              },
            },
            {
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: (Rule: any) =>
                Rule.required().max(100).error('Titel er påkrævet og skal være under 100 tegn'),
            },
            {
              name: 'description',
              title: 'Beskrivelse',
              type: 'text',
              validation: (Rule: any) => Rule.max(500).error('Beskrivelsen må maksimalt være 500 tegn'),
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'subImage',
            },
            prepare(selection: any) {
              const {title, media} = selection
              return {
                title: title || 'Ingen titel',
                media: media,
              }
            },
          },
        },
      ],
      validation: (Rule: any) =>
        Rule.required().min(4).max(20).error('Du skal vælge mellem 4 til 20 artikler'),
    },
    {
      name: 'slug',
      title: 'Guide url - oprettes automatisk',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 150,
      },
      readOnly: true,
      components: {
        input: (props: any) => {
          return React.createElement(
            'div',
            {style: {display: 'flex', alignItems: 'center'}},
            'https://pengehjoernet.dk/guide/',
            props.renderDefault(props),
          )
        },
      },
    },
    {
      name: 'publishedAt',
      title: 'Artiklens publicering',
      type: 'datetime',
      description: 'Dato for publicering',
      initialValue: new Date().toISOString(),
      hidden: ({document}) => !document?.changePublishDate,
    },
    {
      name: 'isPublished',
      title: 'publiceret',
      type: 'number',
      initialValue: 1,
      readOnly: true,
      hidden: true,
    },
    {
      name: 'publishMonth',
      title: 'Artiklens publiceringsmåned',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      articleId: '_id',
      media: 'metaImage',
      journalistName: 'journalist.name',
      updatedDate: '_updatedAt',
      category: 'category.name',
      views: 'views',
      content: 'overview',
      preview: 'previewMode',
      status: 'isPublished',
      date: 'publishedAt'
    },
    prepare(selection: any) {
      const {title, views, journalistName, category, content} = selection;
      const articleDate = new Date(selection.date);
      const formattedDate = articleDate.toLocaleDateString('da-DK', {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
      });
      const formattedTime = articleDate.toLocaleTimeString('da-DK', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      let articleStatus = '';
      if (selection.preview || selection.articleId.includes('drafts.')) { 
        articleStatus = '🟠'; 
      } else {
        articleStatus = selection.status === 1 ? '🟢' : '🔴'; 
      }
      
      const firstname = journalistName?.split(' ')[0];
      
      return {
        title: `${title}`,
        subtitle: `${articleStatus} | ${views}👀| ${firstname}🧑‍🦲 | ${formattedDate} 📆 | ${formattedTime} 🕒`,
        media: selection.media,
      }
    },
  },
  __experimental_omnisearch_visibility: false,
}
