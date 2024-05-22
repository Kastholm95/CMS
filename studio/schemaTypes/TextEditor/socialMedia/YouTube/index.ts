import {defineType, defineField} from 'sanity'
import {YouTubePreview} from './YouTubePreview'
import { FaYoutube as icon } from "react-icons/fa";

export const youTubeType = defineType({
  name: 'youTube',
  type: 'object',
  title: 'YouTube',
  icon: icon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    }),
  ],
  preview: {
    select: {title: 'url'},
  },
  components: {
    preview: YouTubePreview,
  },
})