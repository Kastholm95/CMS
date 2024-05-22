import { defineField, defineType } from 'sanity'
import { MdGroup as icon } from 'react-icons/md'


export default defineType({
     name: 'journalist',
     title: 'Journalister',
     type: 'document',
     icon,
     fields: [
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
               validation: (Rule) => Rule.required().custom(slug => {
                    if (!slug) return true; // Tillader tomme slugs, da der allerede er en 'required' regel
                    const regex = /^[a-z0-9\-]+$/; // Tillader kun små bogstaver, tal og bindestreger
                    if (regex.test(slug.current)) {
                         return true;
                    } else {
                         return 'Slug må kun indeholde små bogstaver, tal og bindestreger.';
                    }
               })
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
               name: 'email',
               title: 'Email (valgfrit)',
               type: 'string',
               description: 'Skriv din email i feltet nedenunder',
          }),
          defineField({
               name: 'phone',
               title: 'Telefonnummer (valgfrit)',
               type: 'string',
               description: 'Skriv dit telefonnummer i feltet nedenunder (valgfrit)',
          }),
     ],
     preview: {
          select: { title: 'name', subtitle: 'email', media: 'image' },
     },
});