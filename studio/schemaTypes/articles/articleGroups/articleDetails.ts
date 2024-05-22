import { defineType, defineField } from 'sanity';
export const articleDetails = defineType({
     name: 'articleDetails',
     title: 'Artikel Detaljer',
     type: 'object',
     fields: [
          defineField({
               name: 'journalist',
               title: 'Skribenter af artiklen',
               type: 'reference',
               description: 'Vælg journalisterne som har skrevet artiklen',
               to: [{ type: 'journalist' }],
               validation: (Rule) => Rule.required().error('Du skal vælge en journalist'),
          }),
          defineField({
               name: 'category',
               title: 'Artiklens kategori',
               type: 'reference',
               description: 'Tilføj kategori til artiklen, eller tilføj et nyt',
               to: [{ type: 'category' }],
               validation: (Rule) => Rule.required().error('Du skal vælge en kategori'),
          }),
          /* defineField({
               name: 'tag',
               title: 'Artiklens tags',
               type: 'array',
               description: 'Tilføj tags til artiklen, eller tilføj et nyt',
               of: [{ type: 'reference', to: [{ type: 'tag' }] }],
               validation: (Rule) => Rule.required().min(1).max(5).error('Du må vælge mindst 1 tag, og maksimalt 5 tags'),
          }), */
     ],
});
