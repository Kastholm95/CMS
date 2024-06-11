import { validation } from "sanity";

export default {
    name: 'subPage',
    title: 'Undersider',
    type: 'document',
    fields: [
         {
              name: 'title',
              title: 'Side Titel',
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
              validation: (Rule: any) => Rule.required()
         },
         {
              name: 'overview',
              title: 'Artiklens tekst indhold',
              type: 'blockContent',
              description: 'Skriv artiklens indhold',
         },
    ]
}