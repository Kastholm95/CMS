import {TextInput, Stack, Text, Flex, Box} from '@sanity/ui'
import { set, unset } from 'sanity'
import { useCallback } from 'react'

export const InputCounter = (props: any) => {
  const {elementProps, onChange, value = ''} = props

  const handleChange = useCallback((event: any) => {
     const nextValue = event.currentTarget.value
     onChange(nextValue ? set(nextValue) : unset())
      }, [onChange])

  return (
    <Flex direction="column" align="stretch">
    <Box flex={1}>
      <TextInput
        {...elementProps}
        onChange={handleChange}
        value={value}
        style={{ width: '100%' }}  // Sørger for at TextInput tager fuld bredde
      />
    </Box>
    <Box marginTop={3}>  
      <Text size={1} muted style={{ fontSize: '0.8rem' }}>Tegn: {value.length}</Text>
    </Box>
  </Flex>
  )
}
