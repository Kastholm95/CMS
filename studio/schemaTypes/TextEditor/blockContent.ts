import { defineArrayMember, defineType, defineField } from 'sanity'

export default defineType({
     name: 'blockContent',
     title: 'Block Content',
     type: 'array',
     of: [
          defineArrayMember({
               title: 'Block',
               type: 'block'
          }),
          defineArrayMember({
               type: 'imageWithMetadata',
               options: { hotspot: true, requiredFields: ['title', 'description'] },
          }),
          defineArrayMember({
               type: 'readMore'
          }),
          defineArrayMember({
               type: 'faceBook'
          }),
          defineArrayMember({
               type: 'youTube'
          }),
          defineArrayMember({
               type: 'tikTok'
          }),
          defineArrayMember({
               type: 'instagram'
          }),



     ],
     styles: [
          { title: 'Normal', type: 'string', value: 'normal' },
          { title: 'H1', type: 'string', value: 'h1' },
          { title: 'H2', type: 'string', value: 'h2' },
          { title: 'H3', type: 'string', value: 'h3' },
          { title: 'H4', type: 'string', value: 'h4' },
          { title: 'Quote', type: 'string', value: 'blockquote' },
     ],
     lists: [{ title: 'Bullet', value: 'bullet' }],
     // Marks let you mark up inline text in the block editor.
     marks: {
          decorators: [
               { title: 'Strong', value: 'strong' },
               { title: 'Emphasis', value: 'em' },
          ],
          annotations: [
               {
                    title: 'URL',
                    name: 'link',
                    type: 'object',
                    fields: [
                         {
                              title: 'URL',
                              name: 'href',
                              type: 'url',
                              validation: Rule => Rule.required()
                         }
                    ]
               }
          ]
     },
});