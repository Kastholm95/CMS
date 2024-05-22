import { defineField, defineType } from 'sanity'
import { MdBook as icon } from 'react-icons/md'

export default defineType({
     name: 'documentation',
     title: 'Guide og dokumentation',
     type: 'document',
     icon,
     fields: [
          defineField({
               name: 'name',
               title: 'Navn på journalisten',
               type: 'string',
               description: 'Skriv dit fornavn og efternavn i feltet nedenunder',
               
          }),
     ],
});