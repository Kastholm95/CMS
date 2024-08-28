import {defineType, defineField} from 'sanity'
import { MdWebhook as icon } from "react-icons/md";
import IframeWrapper from './IframeWrapper';

export const iframeType = defineType({
  name: 'iFrame',
  type: 'object',
  title: 'iFrame',
  icon: icon,
  fields: [
    defineField({
      name: 'url',
      type: 'text',
      title: 'indtast iFrame kode',
    }),
  ],
  preview: {
    select: {title: 'url'},
  },
   components: {
    preview: IframeWrapper,
    },
})