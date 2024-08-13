import {defineField, defineType} from 'sanity'
import { FaTags as icon } from "react-icons/fa";

export default defineType({
  name: 'category',
  title: 'Kategorier',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Artikel kategori',
      description: 'Skriv en kategori til artiklen',
      type: 'string',
       validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Generer et slug',
      type: 'slug',
      description: 'Klik på "Generate" for at generere et slug til kategorien',
      options: {
           source: 'name',
           maxLength: 150,
      },
      hidden: true,
 }),
  ],
  __experimental_omnisearch_visibility: false,
  preview: {
    select: {title: 'name'},
  },
})
