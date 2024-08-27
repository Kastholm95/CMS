import {useState, useEffect} from 'react'
import {EyeOpenIcon, EyeClosedIcon} from '@sanity/icons'
import { useDocumentOperation, useCurrentUser } from 'sanity';
import { createClient } from '@sanity/client';
import {useToast} from '@sanity/ui'

// Opsætning af Sanity klient
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID, 
  dataset: 'production',                           
  useCdn: false,                                   
});


// Funktion til at beregne læsetiden baseret på antallet af ord
function calculateReadingTime(text) {
  const wordsPerMinute = 200; // Gennemsnitlig læsehastighed
  const words = text.split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return `${readingTime}`;
}

// Funktion til at lave en slug fra en streng
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Erstat mellemrum med bindestreg
    .replace(/[^\w\-]+/g, '')       // Fjern alle ikke-ord tegn
    .replace(/\-\-+/g, '-')         // Erstat flere bindestreger med en enkelt bindestreg
    .replace(/^-+/, '')             // Fjern bindestreger fra starten
    .replace(/-+$/, '');            // Fjern bindestreger fra slutningen
}


export function SetAndPublishAction(props) {

  const {patch, publish} = useDocumentOperation(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)
  const isArticleType = props.draft?._type === 'article' || props.published?._type === 'article';
  const isJournalistType = props.draft?._type === 'journalist' || props.published?._type === 'journalist';
  const articleNeverPublished = props.draft?.isPublished === 0;
  const articleHasBeenPublished = props.draft?.isPublished === 1;
  const articleMonth = props.draft?.publishMonth;
  const scheduledPublish = props.draft?.changePublishDate === true || props.published?.changePublishDate === true;
  const republishArticle = props.draft?.republishArticle === true || props.published?.republishArticle === true;
  const originalSlug = props.published?.slug?.current || props.draft?.slug?.current;
  const newSlug = props.published?.newslug?.current || props.draft?.newslug?.current;
  const currentUser = useCurrentUser();
  const toast = useToast();

  useEffect(() => {
    if (isPublishing && !props.draft) {
      setIsPublishing(false)
    }
  }, [props.draft])

  const assignJournalist = async () => {
    if (!currentUser) {
      console.log('No current user');
      return
    }

    const query = `*[_type == "journalist" && (email == $email || name == $name)][0]._id`;
    const params = { email: currentUser.email, name: currentUser.name };

    try {
      const journalistId = await client.fetch(query, params);
      return journalistId;
    } catch (error) {
      console.error('Error fetching journalist', error);
    }
  };
  

  return {
    disabled: publish.disabled,
    tone: 'positive',
    icon: EyeOpenIcon,
    label: isPublishing ? 'Publicerer…' : 'Publicér',
    onHandle: async () => {
      // This will update the button text
      setIsPublishing(true)
      const journalistId = await assignJournalist();

      const textContent = (props.draft?.overview || props.published?.overview || [])
        .filter(block => block._type === 'block')
        .map(block => block.children.map(child => child.text).join(' '))
        .join(' ');
      // Calculate reading time
      const readingTime = calculateReadingTime(textContent);

      const createSlug = slugify(props.draft?.title || props.draft?.name);


      if (isJournalistType && articleNeverPublished) { 
        patch.execute([
          {set: {isPublished: 1}},
          {set: {email: currentUser.email}},
        ])
        toast.push({status: 'success', title: `${currentUser.email} er nu koblet til denne profil`, description: 'Du har nu oprettet dig som journalist, og kan begynde at skrive artikler', closable: true, duration: 40000, icon: EyeClosedIcon, tone: 'critical'});
      }

      if (isArticleType) {

        if(articleNeverPublished) {
          if (!journalistId) {
            console.error('No journalist found');
            toast.push({status: 'error', title: 'Du er ikke en gyldig journalist', description: 'Opret en profil i "Referencer" mappen', closable: true, duration: 40000, icon: EyeClosedIcon, tone: 'critical'});
            return
          }
          if (!scheduledPublish) {
            patch.execute([{set: {publishedAt: new Date().toISOString()}}]);
          }
          patch.execute([
            {set: {isPublished: 1}},
            {set: {reading: readingTime}},
            {set: {journalist: {_type: 'reference', _ref: journalistId}}},
            {set: {publishMonth: new Date(props.draft?.publishedAt || props.published?.publishedAt).getMonth() + 1}},
          ])
          toast.push({status: 'success', title: 'Artiklen er nu publiceret', description: `${currentUser.email} har udgivet artiklen`, closable: true, duration: 40000, icon: EyeClosedIcon, tone: 'positive'});
        }

        if(articleHasBeenPublished) {
          if(newSlug === originalSlug) { 
            toast.push({status: 'error', title: 'Din nye slug er ikke gyldig eller er ens med det originale', description: 'Rediger dit slug så det differencierer fra det originale', closable: true, duration: 40000, icon: EyeClosedIcon, tone: 'critical'});
            return
          }
          if (republishArticle && newSlug !== originalSlug) { 
            toast.push({status: 'success', title: 'Artiklen er sat til genudgivelse', closable: true, duration: 40000, icon: EyeClosedIcon, tone: 'positive'});
          }
          patch.execute([{set: {reading: readingTime}}, {set: {publishMonth: new Date(props.draft?.publishedAt || props.published?.publishedAt).getMonth() + 1}}])
          toast.push({status: 'success', title: 'Artiklen er nu opdateret', description: `${currentUser.email} har opdateret artiklen`, closable: true, duration: 40000, icon: EyeClosedIcon, tone: 'positive'});
        }
      }

      //General execure for all children
      patch.execute([
        {setIfMissing: {slug: {current: createSlug}}}, // Set slug if it is missing
        {unset: ['slug.current']}, // Unset existing slug first
        {set: {slug: {current: createSlug}}}, // Set new slug
      ]);


      // Signal that the action is completed
      props.onComplete()
      // Perform the publish
      publish.execute()

    },
  }
}