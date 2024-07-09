// schemas/siteSettings.js
export default {
     name: 'aboutUs',
     title: 'About us',
     type: 'document',
     fields: [
          {
               name: 'title',
               title: 'Dise Titel',
               type: 'string',
               validation: (Rule: any) => Rule.required()
          },
          {
               name: 'slug',
               title: 'Generer et slug',
               type: 'slug',
               description: 'Klik på "Generate" for at generere et slug ud fra titlen - Dette bruges til at generere en URL til siden.',
               options: {
                    source: 'title',
                    maxLength: 150,
               },
               hidden: true,
          },
          {
               name: 'overview',
               title: 'Artiklens tekst indhold',
               type: 'blockContent',
               description: 'Skriv artiklens indhold',
          },
     ],
     __experimental_omnisearch_visibility: false,
}