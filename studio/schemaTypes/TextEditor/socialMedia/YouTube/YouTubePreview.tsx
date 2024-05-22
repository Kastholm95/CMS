import {Card, Text, Button, Stack} from '@sanity/ui'
import YouTubePlayer from 'react-player/youtube'

interface YouTubePreviewProps {
  title: string
}

export function YouTubePreview(props: YouTubePreviewProps) {
  const {title: url} = props
  return (
    <Card
      radius={2}
      shadow={1}
      padding={[3, 3, 4]}
      tone="primary"
      style={{maxWidth: '270px', margin: 'auto'}}
    >
      {typeof url === 'string' ? (
        <>
          <div style={{width: '100%', maxWidth: '220px', margin: 'auto'}}>
            <YouTubePlayer url={url} width="100%" height="100%" style={{maxHeight: '290px'}} />
          </div>
          <Stack space={3} marginTop={3}>
            <Text style={{display: 'grid', placeContent: 'center'}} muted size={1}>
              <Button
                style={{margin: '0 auto'}}
                text="Dobbeltklik for at ændre Youtube link"
                mode="ghost"
                size={1}
              />
            </Text>
          </Stack>
        </>
      ) : (
        <Text style={{textAlign: 'center'}} muted>
          Tilføj et Youtube URL
        </Text>
      )}
    </Card>
  )
}
