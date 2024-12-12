import {defineType, defineField} from 'sanity'
import { PiFileHtmlFill as icon } from "react-icons/pi";
import CustomCodeWrapper from './CustomCodeWrapper';

export const customCodeType = defineType({
  name: 'customCode',
  type: 'object',
  title: 'HTML code',
  icon: icon,
  fields: [
    defineField({
      name: 'code',
      type: 'text',
      title: 'indtast HTML kode',
    }),
  ],
  preview: {
    select: {title: 'code'},
  },
   components: {
    preview: CustomCodeWrapper,
    },
})