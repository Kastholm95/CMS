import {defineType, defineField} from 'sanity'
import { TikTokPreview } from './TikTokPreview'
import { FaTiktok as icon } from "react-icons/fa";
//import {YouTubePreview} from './YouTubePreview'

export const tikTokType = defineType({
  name: 'tikTok',
  type: 'object',
  title: 'TikTok',
  icon: icon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'TikTok video URL',
    }),
  ],
  preview: {
     select: {title: 'url'},
   },
   components: {
     preview: TikTokPreview,
   },
})