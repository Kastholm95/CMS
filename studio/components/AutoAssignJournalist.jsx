import React, { useEffect, useState } from 'react';
import { useCurrentUser } from 'sanity';
import { Card, Text } from '@sanity/ui';
import { set as setPatch } from 'sanity';
import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,  // Erstat med dit projekt ID
    dataset: 'production',       // Erstat med dit dataset navn
    useCdn: false,                 // Sæt til 'true' hvis det er en read-only anmodning til public data
  });

const AutoAssignJournalist = React.forwardRef((props, ref) => {
    const {value, onChange} = props;
    const currentUser = useCurrentUser();
    const [journalist, setJournalist] = useState(null);
  
    useEffect(() => {
      if (currentUser) {
        // Antag at du har en måde at matche currentUser med en journalist-id
        const query = `*[_type == "journalist" && (email == $email || name == $name)][0]._id`;
        const params = { email: currentUser.email, name: currentUser.name };
  
        client.fetch(query, params).then(journalistId => {
          if (journalistId && !value) { // Tjek om en journalist allerede er sat
            setJournalist(journalistId);
            onChange(setPatch({_ref: journalistId, _type: 'reference'}));
          }
        }).catch(error => {
          console.error('Error fetching journalist', error);
        });
  
        console.log(currentUser, 'Hej fra AutoAssignJournalist');
      }
    }, [currentUser, value, onChange]);
  
    return (
      <Card padding={2} tone="transparent">
        <Text size={1}>
          {journalist ? `Journalist ID: ${journalist}` : 'Du er ikke en registreret journalist, opdater din journalist profil i Referencer'}
        </Text>
      </Card>
    );
  });
  
  export default AutoAssignJournalist;
