import { validation } from "sanity";

export default {
    name: 'msnScrollFeed',
    title: 'Feeds',
    type: 'document',
    fields: [
         {
            name: 'title',
            title: 'Feed Titel',
            type: 'string',
            validation: (Rule: any) => Rule.required()
         },
         {
            name: 'description',
            title: 'Kort beskrivelse af Feed',
            type: 'string',
            validation: (Rule: any) => Rule.required()
         },
         {
            name: 'category',
            title: 'Kategori af Feed - f.eks: (Sparetips, Underholdning)',
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
            name: 'articles',
            title: 'Tilføj artikler',
            type: 'array',
            description: 'Tilføj 1 til 20 artikler der skal indgå i feedet. - Der kan kun tilvælges artikler som har en MSN feed beskrivelse',
            of: [{ type: 'reference', to: [{ type: 'article'}], options:{filter: 'msnFeedDescription == true'}, _id: true }],
            validation: (Rule: any) => Rule.required().min(1).max(20).error('Du kan vælge mellem 1 og 3 artikler'),
         },
        ],
    __experimental_omnisearch_visibility: false,
}