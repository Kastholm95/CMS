import {defineField, defineType} from 'sanity'
import { FaHashtag as icon } from 'react-icons/fa';

export default defineType({
  name: 'tag',
  title: 'Tags',
  type: 'document',
  /* __experimental_formPreviewTitle: false, */
  icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Artikel tag',
      description: 'Skriv et tag til artiklen',
      type: 'string',
       validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Generer et slug',
      type: 'slug',
      description: 'Klik på "Generate" for at generere et slug til tag',
      options: {
           source: 'name',
           maxLength: 150,
      },
      hidden: true,
 }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
