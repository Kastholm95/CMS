import {useState, useEffect} from 'react'
import {useDocumentOperation} from 'sanity'
import {EyeOpenIcon, EyeClosedIcon} from '@sanity/icons'
import { useReadingTime } from "react-hook-reading-time";

export function SetAndPublishAction(props) {
  const {patch, publish} = useDocumentOperation(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)
  let readingTime = 0;
 /*  console.log(props, 'props', props.draft, 'draft', props.published.overview, 'published'); */
  

  useEffect(() => {
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

        if(props.draft.isPublished === 0){
          // Konstruerer en tekststreng fra 'overview' feltets blokke
          const textContent = (props.draft.overview || [])
            .filter(block => block._type === 'block')
            .map(block => block.children.map(child => child.text).join(' '))
            .join(' ');
          
          readingTime = useReadingTime(textContent).reading;

        }else{
          // Konstruerer en tekststreng fra 'overview' feltets blokke
          const textContent = (props.published.overview || [])
            .filter(block => block._type === 'block')
            .map(block => block.children.map(child => child.text).join(' '))
            .join(' ');
          
          readingTime = useReadingTime(textContent).reading;
        }
        patch.execute([
          {set: {reading: readingTime}}
        ]);
 
      // Perform the publish
      publish.execute()

      // Signal that the action is completed
      props.onComplete()
    },
  }
}
