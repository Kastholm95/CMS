export const handleGlobalMetadataConfirm = (props) => {
     const { sanityImage, toast } = props
   
     /** Make sure there is a image _id passed down */
     sanityImage._id
             // if there is an image id, we will patch the data
       ? patchImageData(props)
             // if not we tell the users, that there is an image missing
       : toast.push({
           status: 'error',
           title: `No image found!`,
           description: `Metadata was not added to the asset because there is no _id... `,
         })
   }
   
   /** ### Data patching via patchImageData
    *
    * We also add a toast notification to let the user know what succeeded.
    */
   const patchImageData = ({
     docId,
     sanityImage,
     toast,
     client,
     onClose,
     changed,
     imagePath,
   }) => {
   
     // create an object with the values that should be set
     const valuesToSet = Object.entries(sanityImage).reduce(
       (acc, [key, value]) => {
         if (value === '') {
           return acc
         }
         return {
           ...acc,
           [key]: value,
         }
       },
       {}
     )
     // create an array of key strings (field names) of fields to be unset
     const valuesToUnset = Object.entries(sanityImage).reduce(
       (acc, [key, value]) => {
         if (value === '') {
           return [...acc, key]
         }
         return acc
       },
       []
     )
   
     client
       .patch(sanityImage._id)
       .set(valuesToSet)
       .unset(valuesToUnset)
       .commit(/* {dryRun: true} */) // If you want to test this script first, you can use the dryRun option to see what would happen without actually committing the changes to the content lake.
       .then((res) =>
         toast.push({
           status: 'success',
           title: `Success!`,
           description: `Metadata blev tilføjet til _id ${res._id}`,
         })
       )
       .then(() => {
                  // we also patch a boolean value to the image field (hidden Field) to make sure that validation is rerun on the document (later in the guide)
         client
           .patch(docId)
           .set({ [`${imagePath}.changed`]: !changed })
           .commit()
       })
       .finally(() => onClose())
       .catch((err) => console.error(err))
   }