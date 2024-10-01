import {Button, Card, Dialog, Flex, Box, Label, Stack, TextInput, useToast} from '@sanity/ui'
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
      name: 'description',
      title: 'Kilde',
      description: 'Angiv kilden til billedet.',
      required: true,
    },
  ]

  const fieldsToValidate = requiredFields.reduce((acc, field) => {
    if (field.required) {
      return {...acc, [field.name]: false}
    }
    return acc
  }, {})

  const [validationStatus, setValidationStatus] = useState(fieldsToValidate)


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
        if (!res.description) {
          res.description = 'Shutterstock.com'
        }
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
              defaultValue={'Shutterstock.com'}
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

        <div
     header="Skift billede metadata"
     id="dialog-image-defaults"
     onClose={onClose}
     zOffset={1000}
     width={2}
    >
  <Card padding={5}>
    <Box ddisplay="grid" gridTemplateColumns="1fr 1fr" alignItems="center" gap={3}>
      {inputs}
      <Button
        mode="default"
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
    </Box>
  </Card>
</div>

    </div>
  )
}
export default ImageInput
