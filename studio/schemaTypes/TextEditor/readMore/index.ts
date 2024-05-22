
import { defineType, defineField } from 'sanity';
import { FaBook as icon } from "react-icons/fa";
import  { readMorePreview }  from './readMorePreview';

export const readMoreType = defineType({
  name: 'readMore',
  type: 'object',
  title: 'Læs mere',
  icon: icon,
  fields: [
    defineField({
      name: 'articles',
      title: 'Læs flere',
      type: 'array',
      description: 'Tilføj andre artikler at læse',
      of: [{ type: 'reference', to: [{ type: 'article' }], _id: true }],
      validation: (Rule) => Rule.required().min(1).max(3).error('Du kan vælge mellem 1 og 3 artikler'),
    }),
  ],
  components: {
    preview: readMorePreview,
  },
})

