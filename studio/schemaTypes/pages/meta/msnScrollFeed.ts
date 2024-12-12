import React from "react";

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
            name: 'articles',
            title: 'Tilføj artikler',
            type: 'array',
            description: 'Tilføj 4 til 20 artikler der skal indgå i feedet. - Der kan kun tilvælges artikler som har en MSN feed beskrivelse',
            of: [{ type: 'reference', to: [{ type: 'article'}], options:{filter: 'msnFeedDescription == true'}, _id: true }],
            validation: (Rule: any) => Rule.required().min(4).max(20).error('Du skal vælge mellem 4 til 20 artikler'),
         },
         {
            name: 'slug',
            title: 'Feed url - oprettes automatisk',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 150,
            },
            readOnly: true,
            components: {
              input: (props) => {
                return React.createElement(
                  'div',
                  { style: { display: 'flex', alignItems: 'center' } },
                  'https://pengehjoernet.dk/msnfeed/',
                  props.renderDefault(props)
                )
              }
            }
          },          
        ],
    __experimental_omnisearch_visibility: false,
}