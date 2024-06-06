import {FaHashtag as hashtag} from 'react-icons/fa'
import {IoNewspaperOutline as article} from 'react-icons/io5'
import {RiContactsLine as about} from 'react-icons/ri'
import {RiPagesLine as pages} from 'react-icons/ri'
import {MdContactPhone as contact} from 'react-icons/md'
import {BsCookie as cookie} from 'react-icons/bs'
import {MdPrivacyTip as privacy} from 'react-icons/md'
import {CiHashtag as hashtagg} from 'react-icons/ci'
import {GrCircleInformation as info} from 'react-icons/gr'
import { SiPagespeedinsights as analytics } from "react-icons/si";
import { TbLayoutNavbarCollapseFilled as nav } from "react-icons/tb";
import { TbLayoutNavbarExpandFilled as footer } from "react-icons/tb"
// ./deskStructure.js
const JsonPreview = ({document}) => (
  <>
    {' '}
    // A React fragment to have sibling elements // Pulling the currently displayed version's title
    <h1>JSON Data for "{document.displayed.title}"</h1>
    // Stringifying a JSON representation of the displayed data
    <pre>{JSON.stringify(document.displayed, null, 2)}</pre>
  </>
)
export const defaultDocumentNodeResolver = (S, {documentId, schemaType}) => {
  // Render the JSON preview only on posts or the siteSettings document
  if (schemaType === 'post' || documentId === 'siteSettings') {
    return S.document().views([S.view.form(), S.view.component(JsonPreview).title('JSON')])
  }
}

export const myStructure = (S) =>
  S.list()
    .title('Dokumenter')
    .items([
      S.listItem({icon: article})
      .title('Alle Artikler')
      .child(
        S.documentTypeList('article').title('Alle Artikler').filter('_type == "article"'),
      ),
      
    

      S.listItem({icon: article})
        .title('Filtrer Artikler')
        .child(
          S.list()
            .title('Filters')
            .items([
              S.listItem({icon: analytics})
              .title('Side Visninger')
              .child(
                S.documentTypeList('article')
                .title('Artikler efter sidevisninger')
                .filter('_type == "article"')
              ),
              S.listItem({icon: hashtagg})
                .title('Kategori')
                .child(
                  S.documentTypeList('category')
                    .title('Artikler i kategori')
                    .child((categoryId) =>
                      S.documentList()
                        .title('Artikler')
                        .filter('_type == "article" && $categoryId == details.category._ref')
                        .params({categoryId}),
                    ),
                ),
              S.listItem({icon: hashtagg})
                .title('Tag')
                .child(
                  S.documentTypeList('tag')
                    .title('Artikler med tag')
                    .child((tagId) =>
                      S.documentList()
                        .title('Artikler')
                        .filter('_type == "article" && $tagId in details.tag[]._ref')
                        .params({tagId}),
                    ),
                ),
              S.listItem({icon: about})
                .title('Journalist')
                .child(
                  S.documentTypeList('journalist')
                    .title('Artikler af journalist')
                    .child((authorId) =>
                      S.documentList()
                        .title('Artikler')
                        .filter('_type == "article" && $authorId == details.journalist._ref')
                        .params({authorId}),
                    ),
                ),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'post',
            'siteSettings',
            'navigation',
            'colors',
            'tag',
            'category',
            'article',
            'cookiePolicy',
            'privacyPolicy',
            'contactUs',
            'aboutUs',
            'media.tag',
            'assist.instruction.context',
            'footer'
          ].includes(listItem.getId()),
      ),
      S.listItem({icon: hashtag})
        .title('Referencer')
        .child(
          S.list()
            .title('Referencer')
            .items([
              S.listItem({icon: hashtagg})
                .title('Kategorier')
                .child(S.documentTypeList('category').title('Kategorier')),
              S.listItem({icon: hashtagg})
                .title('Tags')
                .child(S.documentTypeList('tag').title('Tags')),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Info & Undersider')
        .child(
          S.list({icon: pages})
            .title('Info & Undersider')
            .items([
              S.listItem({icon: nav})
                .title('Navigations Menu')
                .child(S.document().schemaType('navigation').documentId('navigation')),
                S.listItem({icon: footer})
                .title('Footer')
                .child(S.document().schemaType('footer').documentId('footer')),
              S.divider(),
              S.listItem({icon: info})
                .title('Om os')
                .child(S.document().schemaType('aboutUs').documentId('aboutUs')),
              S.listItem({icon: about})
                .title('Kontakt Os')
                .child(S.document().schemaType('contactUs').documentId('contactUs')),
              S.listItem({icon: cookie})
                .title('Cookie Policy')
                .child(S.document().schemaType('cookiePolicy').documentId('cookiePolicy')),
              S.listItem({icon: privacy})
                .title('Privacy Policy')
                .child(S.document().schemaType('privacyPolicy').documentId('privacyPolicy')),
            ]),
        ),
    ])