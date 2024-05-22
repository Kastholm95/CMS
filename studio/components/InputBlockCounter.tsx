import React, { useEffect, useState } from 'react';
import { Stack, Text, Flex } from '@sanity/ui';

export const InputBlockCounter = ({ value = [] }) => {
  const [characterCount, setCharacterCount] = useState(0);

  // Funktion til at udregne antal tegn
  const calculateCharacterCount = (blocks) => {
    const totalCharacters = blocks.reduce((total, block) => {
      if (block._type === 'block' && block.children) {
        return total + block.children.reduce((acc, child) => acc + (child.text ? child.text.length : 0), 0);
      }
      return total;
    }, 0);
    return totalCharacters;
  };

  useEffect(() => {
    setCharacterCount(calculateCharacterCount(value));
  }, [value]);  // Opdater tegn tæller når `value` ændres

  return (
    <Flex>
      <Stack space={2}>
        <Text size={1} style={{ marginTop: 'auto', marginBottom: 'auto' }}>Tegn: {characterCount}</Text>
      </Stack>
    </Flex>
  );
};
