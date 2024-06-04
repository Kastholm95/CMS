import {useState, useEffect} from 'react'
import {useDocumentOperation} from 'sanity'
import {EyeOpenIcon, EyeClosedIcon} from '@sanity/icons'

export function SetAndPublishAction(props) {
  const {patch, publish} = useDocumentOperation(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)
  

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false)
    }
  }, [props.draft])

  return {
    disabled: publish.disabled,
    tone: 'positive',
    icon: EyeOpenIcon,
    label: isPublishing ? 'Publicerer…' : 'Publicér',
    onHandle: () => {
      // This will update the button text
      setIsPublishing(true)

      if(props.draft.isPublished === 0) { 
          // Set publishedAt to current date and time
          patch.execute([
            {set: {publishedAt: new Date().toISOString()}},
            {set: {isPublished: 1}}
          ]);
        } 
 
      // Perform the publish
      publish.execute()

      // Signal that the action is completed
      props.onComplete()
    },
  }
}

export function HelloWorldBadge(props) {
    return {
      label: 'Hello world',
      title: 'Hello I am a custom document badge',
      color: "success"
    }
  } 