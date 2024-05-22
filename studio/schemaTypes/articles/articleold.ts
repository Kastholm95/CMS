import { defineField, defineType } from 'sanity'
import { IoNewspaperOutline as icon } from "react-icons/io5";
import { InputCounter } from '../../components/InputCounter';
export default defineType({
  name: 'kategori1',
  title: 'Artikler',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel på artikel',
      type: 'string',
      description: 'Skriv titlen på artiklen her',
      validation: (Rule) => Rule.custom(name => {
        if (!name || name.trim() === '') {
          return 'Indtastning af titel er påkrævet.';
        }
        return true;
      }),
    }),
    defineField({
      name: 'slug',
      title: 'Generer et slug',
      type: 'slug',
      description: 'Klik på "Generate" for at generere et slug ud fra titlen på artiklen - Dette bruges til at generere en URL til artiklen.',
      options: {
        source: 'title',
        maxLength: 150,
      },
    }),


    
    
    defineField({
      type: 'imageWithMetadata',
      name: 'metaImage',
      title: 'Billede & metadata',
      description: 'Upload et billede, eller vælg et billede fra galleriet nedenfor. Billedet bruges som artikelens forsidebillede. HUSK at angiv kilden til billedet, hvis det ikke er dit eget',
      options: {
        requiredFields: ['title', 'description'],
      },
    }),

    defineField({
      name: 'teaser',
      title: 'Teaser',
      type: 'string',
      description: 'Skriv en kort teaser til artiklen',
    }),
    defineField({
      name: 'overview',
      title: 'Artiklens tekst indhold',
      type: 'blockContent',
      description: 'Skriv artiklens indhold',
    }),

    defineField({
      name: 'details',
      title: 'Detaljer',
      type: 'articleDetails',
    }),
    // Facebook opengraph fields
    defineField({
      name: 'facebookFields',
      title: 'Rediger Opengraph Facebook - (Valgfrit)',
      type: 'boolean',
      description: 'Hvis ikke redigeret, bruges standard dataen fra artiklen. Heriblandt titel, teaser, billede og kilde. (Anbefalet)',
      initialValue: false,
    }),
    defineField({
      name: 'facebookTitle',
      title: 'Ændre titel på Facebook opslag - (Valgfrit)',
      type: 'string',
      description: 'Ændrer Meta titlen, efterlad tom for at bruge standard titlen fra artiklen. (Anbefalet)',
      hidden: ({ document }) => !document?.facebookFields,
    }),
    defineField({
      name: 'facebookDescription',
      title: 'Ændre teaser på Facebook opslag - (Valgfrit)',
      type: 'blockContent',
      description: 'Ændrer Meta beskrivelsen, efterlad tom for at bruge standard teaser fra artiklen. (Anbefalet)',
      hidden: ({ document }) => !document?.facebookFields,
    }),
    //Twitter opengraph fields
    defineField({
      name: 'twitterFields',
      title: 'Rediger Twitter/X - (Valgfrit)',
      type: 'boolean',
      description: 'Hvis ikke redigeret, bruges standard dataen fra artiklen. Heriblandt titel, teaser, billede og kilde. (Anbefalet)',
      initialValue: false,
    }),
    defineField({
      name: 'twitterTitle',
      title: 'Ændre titel på Twitter opslag - (Valgfrit)',
      type: 'string',
      description: 'Ændrer Meta titlen, efterlad tom for at bruge standard titlen fra artiklen. (Anbefalet)',
      hidden: ({ document }) => !document?.twitterFields,
    }),
    defineField({
      name: 'twitterDescription',
      title: 'Ændre teaser på Twitter opslag - (Valgfrit)',
      type: 'blockContent',
      description: 'Ændrer Meta beskrivelsen, efterlad tom for at bruge standard teaser fra artiklen. (Anbefalet)',
      hidden: ({ document }) => !document?.twitterFields,
    }),
  ]
});