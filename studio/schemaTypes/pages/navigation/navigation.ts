import { defineField } from "sanity";


export default {
    name: 'navigation',
    title: 'Navigationsmenu',
    type: 'document',
    fields: [
        defineField({
            name: 'navTitle',
            title: 'Navigationsmenu',
            type: 'string',
            initialValue: 'Navigationsmenu',
      readOnly: true,
      hidden: true,
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            description: 'Upload dit logo her. Logoet bruges som identifikation af dit website og vises i navigationsmenuen.',
        }),
        defineField({
            name: 'logoDark',
            title: 'Logo til Dark Mode',
            type: 'image',
            description: 'Upload dit logo til Dark Mode her. Logoet bruges som identifikation af dit website og vises i navigationsmenuen, når brugeren har aktiveret Dark Mode.',
        }),
        defineField({
            name: 'navItems',
            title: 'Menupunkter',
            type: 'array',
            description: 'Administrer menupunkterne i navigationsmenuen. Her kan du tilføje, redigere, eller fjerne sider, der skal vises som links i navigationsbaren på dit website. Dette er afgørende for at sikre en brugervenlig og effektiv navigation for brugere.',
            of: [{ type: 'reference', to: [{ type: 'category'} ] }],
            validation: (Rule) => Rule.required().min(3).max(6).error('Der skal være mindst 3 menupunkter og maksimalt 7 for optimal brugervenlighed og strukturering af indholdet.'),
        }),
        defineField({
            name: 'frontpageBoolean',
            title: 'Vis forside',
            type: 'boolean',
            description: 'Aktiver for at vise "Forside" som det første element i navigationsmenuen på dit website.',
        }),
    ]
}
