// schemas/siteSettings.js
export default {
  name: 'cookiePolicy',
  title: 'Cookie Policy',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Side Titel',
      type: 'string'
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

    },
    {
      name: 'overview',
      title: 'Artiklens tekst indhold',
      type: 'blockContent',
      description: 'Skriv artiklens indhold',
    },
  ]
}