import { Flex, Text } from '@sanity/ui'
import styled from 'styled-components'

const ElegantBox = styled(Flex)`
  margin-top: 0px; // Justeret margin for at tilføje lidt plads omkring boksen
  padding: 12px; // Indre padding for at give indhold mere rum
  gap: 12px; // Afstand mellem titel og værdi
  background-color: #f9f9f9; // En let baggrundsfarve for at skille boksen ud
  border: 1px solid #e0e0e0; // En subtil border for at definere boksen
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); // En let skygge for dybde
  border-radius: 4px; // Afrundede hjørner for et blødere look
  align-items: center; // Sikrer at indholdet er centreret vertikalt
`

const Metadata = ({ title, value }) => {
  return (
    <ElegantBox>
      <Text weight="bold" muted size={2}>
        {title}:
      </Text>
      <Text size={1} muted>
        {value ? `${value.substring(0, 80)}${value.length < 80 ? '' : '...'}` : 'Undefined'}
      </Text>
    </ElegantBox>
  )
}

export default Metadata
