import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { myStructure, defaultDocumentNodeResolver } from './deskStructure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { media } from 'sanity-plugin-media'
import { scheduledPublishing } from '@sanity/scheduled-publishing'
import { assist } from '@sanity/assist'
import { theme } from 'https://themer.sanity.build/api/hues?preset=tw-cyan'
import './stylesheets/custom.css'
import logo from './components/customLogo'
import { daDKLocale } from '@sanity/locale-da-dk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { unsplashAssetSource } from 'sanity-plugin-asset-source-unsplash'
import { pexelsImageAsset } from 'sanity-plugin-asset-source-pexels'
import { presentationTool } from 'sanity/presentation'

/* const {theme} = (await import(
  // @ts-expect-error -- TODO setup themer.d.ts to get correct typings
  'https://themer.sanity.build/api/hues?preset=tw-cyan'
)) as {theme: import('sanity').StudioTheme} */
import { imageType } from './schemaTypes/image/imageType'
import { imageShopAsset } from '@imageshop-org/sanity-plugin-asset-source-imageshop'

export default defineConfig({
  basePath: '/studio',
  theme,
  name: process.env.SANITY_STUDIO_TITLE,
  title: process.env.SANITY_STUDIO_TITLE,
  icon: logo,
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production',

  plugins: [structureTool({
    structure: myStructure, defaultDocumentNode: defaultDocumentNodeResolver,
  }), visionTool(), media(), assist(), scheduledPublishing(), daDKLocale(), unsplashImageAsset(), pexelsImageAsset({
    API_KEY: 'ge1IUYa6cLyoBaDAXthpkVhf0UVm9ydomVM7DnSjnSkM4CAHT9EVbRd6',
  }), /* , imageShopAsset({}) */
  /* presentationTool({
    previewUrl: {
      draftMode: {
        enable: '/api/draft',
      },
    },
  }), */
],

  /* form: {
    image: {
      assetSources: () => [unsplashAssetSource],
      directUploads: true,
    },
  }, */

  schema: {
    types: [...schemaTypes, imageType],
  },
})


/* const {theme} = (await import(
  // @ts-expect-error -- TODO setup themer.d.ts to get correct typings
  'https://themer.sanity.build/api/hues'
)) as {theme: import('sanity').StudioTheme} */




