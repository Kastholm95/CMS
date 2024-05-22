export const imageMetadataQuery = groq`*[_type == "sanity.imageAsset" && _id == $imageId ][0]{
     _id,
     title,
     description,
     'altText': coalesce(
       @.asset->.altText,
       'Image of: ' +  @.asset->title, 
       ''
     ),
     'imageDimensions': @.asset->metadata.dimensions,
     'blurHashURL': @.asset->metadata.lqip
   }`

// or in another query
export const pageQuery = groq`
 *[_type == "page" && slug.current == $slug][0]{
   _id,
   description,
   title,
   _type,
   'slug': slug.current,
         'image': image {
           ...,
              'title': @.asset->.title,
              'altText': coalesce(
                     @.asset->.altText,
                     'Image of Work: ' +  @.asset->title, 
                     ''),
              'description': @.asset->.description
           'imageDimensions': @.asset->metadata.dimensions,
              'blurHashURL': @.asset->metadata.lqip
              }
          }
`