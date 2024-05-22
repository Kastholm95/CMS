import {defineType, defineField} from 'sanity'
import { InstagramPreview } from './InstagramPreview'
import { FaInstagram as icon } from "react-icons/fa";

export const instagramType = defineType({
  name: 'instagram',
  type: 'object',
  title: 'Instagram',
  icon: icon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Instagram video URL',
    }),
  ],
  preview: {
     select: {title: 'url'},
   },
   components: {
     preview: InstagramPreview,
   },
})