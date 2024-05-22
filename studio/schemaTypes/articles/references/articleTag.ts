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
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
