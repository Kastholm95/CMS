import {defineField, defineType} from 'sanity'
import {IoNewspaperOutline as icon} from 'react-icons/io5'
import { FaRegEye as view } from "react-icons/fa";

/* import CustomEditor from '../wordCount/CustomEditor' */
export default defineType({
  name: 'article',
  title: 'Artikler',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'views',
      title: 'Page View Counter (Beta)',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Titel på artikel',
      type: 'string',
      description: 'Skriv titlen på artiklen her',
      validation: (Rule) =>
        Rule.custom((name) => {
          if (!name || name.trim() === '') {
            return 'Indtastning af titel er påkrævet.'
          }
          return true
        }),
    }),
    defineField({
      name: 'slug',
      title: 'Generer et slug',
      type: 'slug',
      description:
        'Klik på "Generate" for at generere et slug ud fra titlen på artiklen - Dette bruges til at generere en URL til artiklen.',
      options: {
        source: 'title',
        maxLength: 150,
      },
    }),

    defineField({
      type: 'imageWithMetadata',
      name: 'metaImage',
      title: 'Billede & metadata',
      description:
        'Tilføj et nyt billede, som repræsenterer artiklen. Billedet bruges til at repræsentere artiklen på forsiden og på sociale medier. Du kan uploade, copy paste, vælge forhenværende billede, eller klikke på "Vælg" og bruge en indbygget version af Pexels eller Unsplash',
      options: {
        requiredFields: ['title', 'description'],
      },
    }),
    defineField({
      name: 'teaser',
      title: 'Teaser',
      type: 'string',
      description: 'Skriv en kort teaser til artiklen',
      /* components: {
        input: InputCounter,
      } */
    }),
    defineField({
      name: 'overview',
      title: `Artiklens tekst indhold`,
      type: 'blockContent',
      description: 'Skriv artiklens indhold',
    }),
    defineField({
      name: 'details',
      title: 'Detaljer',
      type: 'articleDetails',
    }),
    defineField({
      name: 'tag',
      title: 'Artiklens tags',
      type: 'array',
      description: 'Tilføj tag/tags til artiklen',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
      validation: (Rule) =>
        Rule.required().min(1).max(5).error('Du må vælge mindst 1 tag, og maksimalt 5 tags'),
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'boolean',
      description: 'Tilføj en disclaimer til artiklen',
      initialValue: true,
    }),
    defineField({
      name: 'isPublished',
      title: 'publiceret',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'changePublishDate',
      title: 'Skift artiklens publiceringsdato',
      type: 'boolean',
      description: 'Publiceringsdatoen sættes automatisk til artiklens første publicering',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Første publicering',
      type: 'datetime',
      description: 'Dato for første publicering',
      initialValue: new Date().toISOString(),
      hidden: ({document}) => !document?.changePublishDate,
    })
    // Facebook opengraph fields
    /* defineField({
      name: 'facebookFields',
      title: 'Rediger Opengraph Facebook - (Valgfrit)',
      type: 'boolean',
      description:
        'Hvis ikke redigeret, bruges standard dataen fra artiklen. Heriblandt titel, teaser, billede og kilde. (Anbefalet)',
      initialValue: false,
    }),
    defineField({
      name: 'facebookTitle',
      title: 'Ændre titel på Facebook opslag - (Valgfrit)',
      type: 'string',
      description:
        'Ændrer Meta titlen, efterlad tom for at bruge standard titlen fra artiklen. (Anbefalet)',
      hidden: ({document}) => !document?.facebookFields,
    }),
    defineField({
      name: 'facebookDescription',
      title: 'Ændre teaser på Facebook opslag - (Valgfrit)',
      type: 'blockContent',
      description:
        'Ændrer Meta beskrivelsen, efterlad tom for at bruge standard teaser fra artiklen. (Anbefalet)',
      hidden: ({document}) => !document?.facebookFields,
    }), */
    //Twitter opengraph fields
    /* defineField({
      name: 'twitterFields',
      title: 'Rediger Twitter/X - (Valgfrit)',
      type: 'boolean',
      description:
        'Hvis ikke redigeret, bruges standard dataen fra artiklen. Heriblandt titel, teaser, billede og kilde. (Anbefalet)',
      initialValue: false,
    }),
    defineField({
      name: 'twitterTitle',
      title: 'Ændre titel på Twitter opslag - (Valgfrit)',
      type: 'string',
      description:
        'Ændrer Meta titlen, efterlad tom for at bruge standard titlen fra artiklen. (Anbefalet)',
      hidden: ({document}) => !document?.twitterFields,
    }),
    defineField({
      name: 'twitterDescription',
      title: 'Ændre teaser på Twitter opslag - (Valgfrit)',
      type: 'blockContent',
      description:
        'Ændrer Meta beskrivelsen, efterlad tom for at bruge standard teaser fra artiklen. (Anbefalet)',
      hidden: ({document}) => !document?.twitterFields,
    }), */
  ],
  preview: {
    select: {
      title: 'title',
      date: 'releaseDate',
      media: 'metaImage',
      journalistName: 'details.journalist.name',
      updatedDate: '_updatedAt',
      category: 'details.category.name',
      views: 'views',
      content: 'overview',
    },
    prepare(selection) {
      const {title, views, journalistName, category, content} = selection;
      const characterCount = calculateCharacterCount(content); // Call calculate function
      
      return {
        title: `${title}`,
        subtitle: `Views: ${views} | Tegn: ${characterCount} | ${category} | ${journalistName}`,
        media: selection.media,
      }
    },
  },
})
function calculateCharacterCount(blocks: any) {
  if (!blocks) return 0;
  return blocks.reduce((total: any, block: any) => {
    if (block._type === 'block' && block.children) {
      return total + block.children.reduce((acc, child) => acc + (child.text ? child.text.length : 0), 0);
    }
    return total;
  }, 0);
}