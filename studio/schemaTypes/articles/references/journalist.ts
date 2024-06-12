import { defineField, defineType } from 'sanity'
import { MdGroup as icon } from 'react-icons/md'
import ProfileCreator from '../../../components/infoBoxes/ProfileCreator'


export default defineType({
     name: 'journalist',
     title: 'Journalister',
     type: 'document',
     icon,
     fields: [
          defineField({
               name: 'info',
               type: 'string',
               components: {
                 input: ProfileCreator,
               },   
          }),
          defineField({
               name: 'name',
               title: 'Navn på journalisten',
               type: 'string',
               description: 'Skriv dit fornavn og efternavn i feltet nedenunder',
               validation: (Rule) => Rule.custom(name => {
                    if (!name || name.trim() === '') {
                         return 'Indtastning af navn er påkrævet.'; // Tilpasset fejlbesked
                    }
                    return true; // Ingen fejl, valideringen er bestået
               }),
          }),
          defineField({
               name: 'slug',
               title: 'Generer et slug',
               type: 'slug',
               description: 'Klik på "Generate" for at generere et slug ud fra dit navn',
               options: {
                    source: 'name',
                    maxLength: 150,
               },
               hidden: true,
          }),
          defineField({
               name: 'image',
               title: 'Billede af journalisten (valgfrit)',
               type: 'image',
               description: 'Upload et billede af dig selv',
               options: {
                    hotspot: true,
               },
          }),
          defineField({
               name: 'description',
               title: 'Beskrivelse af journalisten (valgfrit)',
               type: 'blockContent',
               description: 'Skriv en beskrivelse af dig selv',
          }),
          defineField({
               name: 'contactEmail',
               title: 'Email - bliver ikke offentliggjort (valgfrit)',
               type: 'string',
               description: 'Kun synligt for dine kolleger og administratorer',
          }),
          defineField({
               name: 'email',
               title: 'Email (valgfrit)',
               type: 'string',
               description: 'Sammenlignes med Sanity Email Validator',
               readOnly: true,
               hidden: true,
          }),
          defineField({
               name: 'isPublished',
               title: 'publiceret',
               type: 'number',
               initialValue: 0,
               readOnly: true,
               hidden: true,
             }),
          defineField({
               name: 'phone',
               title: 'Telefonnummer - bliver ikke offentliggjort (valgfrit)',
               type: 'string',
               description: 'Kun synligt for dine kolleger og administratorer',
          }),
     ],
     preview: {
          select: { title: 'name', subtitle: 'contactEmail', media: 'image' },
     },
});