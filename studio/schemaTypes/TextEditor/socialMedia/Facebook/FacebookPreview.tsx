import {Card, Text, Button, Stack} from '@sanity/ui'
import FacebookPlayer from 'react-player/facebook'
import {FacebookEmbed} from 'react-social-media-embed'

interface FacebookPreviewProps {
  title: string
  iframeUrl: string
  postUrl: string
}

export function FacebookPreview(props: FacebookPreviewProps) {
  const {title: url, iframeUrl: iframeurl, postUrl: posturl} = props
  console.log('iframeurl:', iframeurl)
  return (
    <Card
      radius={2}
      shadow={1}
      padding={[0, 0, 2]}
      tone="primary"
      style={{margin: 'auto', maxWidth: '340px'}}
    >
      {typeof url === 'string' || typeof iframeurl === 'string' || typeof posturl === 'string' ? (
        <>
          <div style={{width: '100%', margin: 'auto'}}>
            {' '}
            {/* Her sætter vi en maks bredde på video containeren */}
            {url ? (
              <FacebookPlayer url={url} width="100%" height="100%" style={{maxHeight: '290px'}} />
            ) : null}
          </div>

          {iframeurl ? (
            <div style={{width: '100%', margin: 'auto', maxHeight: '370px' }}>
              <div
                width="100%"
                height="100%"
                style={{transform: 'scale(0.5)', margin: '-9em auto', marginRight: '11em'}}
                dangerouslySetInnerHTML={{__html: iframeurl}}
              ></div>
            </div>
          ) : null}

          {posturl ? (
            <div style={{width: '100%', margin: 'auto'}}>
              <FacebookEmbed
                url={posturl}
                width="100%"
                height="100%"
                style={{transform: 'scale(0.7)', margin: '-4em 0'}}
              />
            </div>
          ) : null}
          <Stack space={3} marginTop={3}>
            <Text style={{display: 'grid', placeContent: 'center'}} muted size={1}>
              <Button
                style={{margin: '0 auto'}}
                text="Dobbeltklik for at ændre Facebook medie"
                mode="ghost"
                size={1}
              />
            </Text>
          </Stack>
        </>
      ) : (
        <Text style={{textAlign: 'center'}} muted>
          Tilføj et Facebook Medie{' '}
        </Text>
      )}
    </Card>
  )
}
