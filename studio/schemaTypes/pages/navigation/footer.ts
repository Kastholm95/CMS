import { defineField } from "sanity";

export default {
    name: 'footer',
    title: 'Footer Menu',
    type: 'document',
    fields: [
        defineField({
            name: 'footerTitle',
            title: 'Titel på Footer Menu',
            type: 'string',
            initialValue: 'Footer Menu',
            readOnly: true,
            hidden: true,
        }),
        defineField({
            name: 'footerItems',
            title: 'Footer Menupunkter',
            type: 'array',
            description: 'Tilføj, rediger eller fjern individuelle footer menupunkter. Hvert menupunkt består af en titel og et valg mellem kategorier eller tags, som definerer indholdets strukturering i footer-menuen.',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            title: 'Menupunkt Titel',
                            description: 'Angiv en titel for dette menupunkt.'
                        },
                        {
                            name: 'links',
                            type: 'array',
                            title: 'Links',
                            description: 'Vælg mellem kategorier eller tags for at inkludere som links under dette menupunkt.',
                            of: [{ type: 'reference', to: [{ type: 'category'}, { type: 'tag'}, {type: 'subPage'},  { type: 'aboutUs'}, {type: 'contactUs'}, {type: 'privacyPolicy'}, {type: 'cookiePolicy'} ] }],
                            validation: (Rule) => Rule.required().min(2).max(4).error('Vælg mindst 2 og højst 4 kategorier eller tags.')
                        }
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            links: 'links'
                        },
                        prepare({ title, links }) {
                            const linkCount = Array.isArray(links) ? links.length : 0;
                            const linkText = linkCount === 1 ? '1 link' : `${linkCount} links`;
                            return {
                                title: title,
                                subtitle: linkText
                            };
                        }
                    }
                }
            ],
            validation: (Rule) => Rule.required().min(1).error('Der skal være mindst ét menupunkt.'),
        }),
    ],
    __experimental_omnisearch_visibility: false,
}
