import {Button, Card, Dialog, Flex, Label, Stack, TextInput, useToast} from '@sanity/ui'
import {ComponentType, useCallback, useEffect, useState} from 'react'
import {useClient} from 'sanity'
import {Subscription} from 'rxjs'
import {handleGlobalMetadataConfirm} from './utils/handleGlobalMetadataConfirm'
import {sleep} from './utils/sleep'
import Metadata from './Metadata'
import {ImageIcon} from '@sanity/icons'

const ImageInput = (props) => {
  const requiredFields = props.schemaType?.options?.requiredFields ?? []

  /** Sanity client */
  const imageId = props.value?.asset?._ref
  const toast = useToast()
  const client = useClient({apiVersion: '2023-03-25'})

  const fields = [
    {
      name: 'title',
      title: 'Titel',
      description: 'Skriv en kort titel til billedet og gør det let at finde til senere brug.',
      required: true,
    },
    {
      name: 'description',
      title: 'Kilde',
      description: 'Angiv kilden til billedet.',
      required: true,
    },
    {
      name: 'altText',
      title: 'Alt Tekst',
      description: 'Efterlad blank for at bruge artikel slug (Anbefalet)',
    },
  ]

  const fieldsToValidate = requiredFields.reduce((acc, field) => {
    if (field.required) {
      return {...acc, [field.name]: false}
    }
    return acc
  }, {})

  const [validationStatus, setValidationStatus] = useState(fieldsToValidate)

  /** The ID of the selected image
   *  To get rid of TS errors (if you are using Typescript), we need to add a new type `MetadataImage` which extends `Image`
   *  see {@link https://gist.github.com/bobinska-dev/103e589ffc254a3b13f3965423f41fed#file-types-ts}
   */

  /** State to store the image metadata */
  const [sanityImage, setSanityImage] = useState({})

  /** Dialog (dialog-image-defaults) */
  const [open, setOpen] = useState(false)
  const onClose = useCallback(() => setOpen(false), [])
  const onOpen = useCallback(() => setOpen(true), [])

  const handleChange = useCallback(
    (event, field) => {
      /* unset value */
      event === ''
        ? setSanityImage((prevSanityImage) => ({
            ...prevSanityImage,
            [field]: '',
          }))
        : setSanityImage((prevSanityImage) => ({
            ...prevSanityImage,
            [field]: event,
          }))

      const isFieldToValidate = fieldsToValidate[field] !== undefined
      isFieldToValidate &&
        setValidationStatus((prevValidationStatus) => ({
          ...prevValidationStatus,
          [field]: event.trim() !== '' ? true : false,
        }))
    },
    [fieldsToValidate],
  )

  /*
   * Fetching the global image data
   */
  useEffect(() => {
    let subscription
    const fetchAndListen = async () => {
      if (!imageId) {
        setSanityImage(null)
        return
      }

      await sleep(2000) // Vent lidt tid for at sikre, at imageId er klar

      const query = `*[_type == "sanity.imageAsset" && _id == $imageId ][0]{
            _id,
            altText,
            title, 
            description,
        }`
      const params = {imageId: imageId}

      try {
        const res = await client.fetch(query, params)
        setSanityImage(res)
        updateValidationStatus(res)
      } catch (err) {
        console.error(err.message)
      }

      subscription = client.listen(query, params, {visibility: 'query'}).subscribe(() => {
        console.log('Detected change, refetching')
        client.fetch(query, params).then(setSanityImage).catch(console.error)
      })
    }

    fetchAndListen()

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [imageId, client])

  /** Input fields based on the `fields` array  */
  const inputs = fields.map((field) => {
    return (
      <Card paddingBottom={4} key={field.name}>
        <label>
          <Stack space={3}>
            <Label size={4}>
              {field.title}
            </Label>
            <Label>
              {field.description}
            </Label>
            <TextInput
              id="imageTitle"
              fontSize={2}
              onChange={(event) => handleChange(event.currentTarget.value, field.name)}
              placeholder={field.title}
              value={sanityImage ? sanityImage[field.name] : ''}
              required={field.required}
            />
          </Stack>
        </label>
      </Card>
    )
  })

  return (
    <div>
      {/* * * DEFAULT IMAGE INPUT * * *
       */}
      {props.renderDefault(props)}

      {/* * * METADATA PREVIEW DISPLAYED UNDERNEATH INPUT * * *
       */}
      {sanityImage && (
        <Stack marginTop={1} space={1} paddingBottom={0}>
          <Metadata title="Titel" value={sanityImage?.title} />
          <Metadata title="Billed kilde" value={sanityImage?.description} />
          <Metadata title="Alt tekst" value={sanityImage?.altText} />
        </Stack>
      )}

      <Stack paddingY={2}>
        {/* * * BUTTON TO OPEN EDIT MODAL * * *
         */}
        <Flex paddingY={3}>
          <Button
            mode="default"
            text="Skift metadata"
            onClick={onOpen}
            disabled={imageId ? false : true}
            fontSize={[1.2, 1.2, 1.2]}
            icon={ImageIcon}
            style={{
              cursor: 'pointer',
            }}
          />
        </Flex>
      </Stack>

      {/* * * METADATA INPUT MODAL * *
       */}
      {open && (
        <Dialog
          header="Skift billede metadata"
          id="dialog-image-defaults"
          onClose={onClose}
          zOffset={1000}
          width={2}
        >
          <Card padding={5}>
            <Stack space={3}>
              {/*
               * * * INPUT FIELDS * * *
               */}
              {inputs}

              {/*
               * * * SUBMIT BUTTON * * *
               */}
              <Button
                mode="ghost"
                onClick={() =>
                  handleGlobalMetadataConfirm({
                    sanityImage,
                    toast,
                    client,
                    onClose,
                  })
                }
                text="Gem ændringer"
                disabled={!Object.values(validationStatus).every((isValid) => isValid)}
              />
            </Stack>
          </Card>
        </Dialog>
      )}
    </div>
  )
}
export default ImageInput
