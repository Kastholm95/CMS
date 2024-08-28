import { defineType, defineField } from 'sanity'
import { FacebookPreview } from './FacebookPreview'
import { FaFacebook as icon } from "react-icons/fa";
import IframeWrapper from '../../iFrame/IframeWrapper';

export const faceBookType = defineType({
  name: 'faceBook',
  type: 'object',
  title: 'Facebook',
  icon: icon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Facebook Video URL',
      validation: Rule => Rule.custom((value, context) => {
        const { iframeurl, posturl } = context.parent;
        return (!value && !iframeurl && !posturl) || (!!value + !!iframeurl + !!posturl === 1) ? true : "Der kan kun vælges 1 Facebook Medie af gangen."
      }),
    }),
    defineField({
      name: 'posturl',
      type: 'url',
      title: 'Facebook Billede & Post URL',
      validation: Rule => Rule.custom((value, context) => {
        const { url, iframeurl } = context.parent;
        return (!value && !url && !iframeurl) || (!!value + !!url + !!iframeurl === 1) ? true : "Der kan kun vælges 1 Facebook Medie af gangen."
      }),
    }),
    defineField({
      name: 'iframeurl',
      type: 'text',
      title: 'Iframe URL',
      description: 'URL til iframe-indhold',
      validation: Rule => Rule.custom((value, context) => {
        const {url, posturl} = context.parent;
        return (!value && !url  && !posturl) || (!!value + !!url + !!posturl === 1) ? true : "Der kan kun vælges 1 Facebook Medie af gangen."
      }),
    }),
  ],
  preview: {
    select: { title: 'url', iframeUrl: 'iframeurl', postUrl: 'posturl' },
  },
  components: {
    preview: FacebookPreview,
  },
})
