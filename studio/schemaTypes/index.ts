import blockContent from './TextEditor/blockContent'

import journalist from './articles/references/journalist'
import articleTag from './articles/references/articleTag'
import articleCategory from './articles/references/articleCategory'
import {articleDetails} from './articles/articleGroups/articleDetails'
// Nyhedsartikle Katagorier
import article from './articles/article'

import aboutus from './pages/aboutus'
import contactus from './pages/contactus'
import cookiepolicy from './pages/cookiepolicy'
import privacypolicy from './pages/privacypolicy'

import navigation from './pages/navigation/navigation'
import footer from './pages/navigation/footer'

import {faceBookType} from './TextEditor/socialMedia/Facebook'
import {youTubeType} from './TextEditor/socialMedia/YouTube'
import {tikTokType} from './TextEditor/socialMedia/TikTok'
import {instagramType} from './TextEditor/socialMedia/Instagram'
import {readMoreType} from './TextEditor/readMore'

export const schemaTypes = [
  blockContent,
  article,
  articleCategory,
  articleTag,
  journalist,
  faceBookType,
  youTubeType,
  tikTokType,
  instagramType,
  readMoreType,
  articleDetails,
  aboutus,
  contactus,
  cookiepolicy,
  privacypolicy,
  navigation,
  footer
]
