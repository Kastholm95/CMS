// schemas/image/imageType.js

import {ImageIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

import ImageInput from './components/ImageInput'

export const imageType = defineType({
  name: 'imageWithMetadata',
  type: 'image',
  title: 'Image',
  icon: ImageIcon,
  options: {
    // optional and not used in this guide for now
    hotspot: true,
    metadata: ['blurhash', 'lqip', 'palette'],
    // requiredFields are set here for custom validation and more
    /* requiredFields: ['title'], */
  },
  components: {
    input: ImageInput,
  },
  validation: (Rule) =>
  Rule.custom(async (value, context) => {
    const client = context.getClient({ apiVersion: '2021-03-25' })

    /** Stop validation when no value is set
     * If you want to set the image as `required`,
     * you should change `true` to "Image is required"
     * or another error message
     */
    

    /** Get global metadata for set image asset */
    

    /** Check if all required fields are set */
   /*  const requiredFields = context.type.options.requiredFields

    const invalidFields = requiredFields.filter((field) => {
      return imageMeta[field] === null
    })
    if (invalidFields.length > 0) {
      const message = `Tilføj metadata ${invalidFields.join(
        ', '
      )} til billedet`
      return { valid: false, message }
    } */
    return true
  }),
fields: [
  // we use this to cause revalidation of document when the image is changed
  // A listener would also be an option, but more complex
  defineField({
    type: 'boolean',
    name: 'changed',
    hidden: true,
  }),
],
})
