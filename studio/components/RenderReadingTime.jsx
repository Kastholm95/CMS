import React from "react";
import { Card, Stack, Inline, Badge } from "@sanity/ui";
import { FormField } from "sanity";
import { useFormValue } from 'sanity';
import { useReadingTime } from 'react-hook-reading-time';

const RenderReadingTime = React.forwardRef((props, ref) => {
    const { type } = props;
    const { displayed } = useFormValue();

    // Konstruerer en tekststreng fra 'overview' feltets blokke
    const textContent = (displayed?.overview || [])
        .filter(block => block._type === 'block')
        .map(block => block.children.map(child => child.text).join(' '))
        .join(' ');

    const readingTime = useReadingTime(textContent);

    return (
        <FormField description={type.description} title={type.title} ref={ref}>
            <Card padding={[3, 3, 3, 3]} shadow={1} radius={2}>
                <Stack space={[3, 3, 3]}>
                    <Inline space={2}>
                        <Badge tone="primary">{readingTime.text}</Badge>
                        <Badge>{`${readingTime.words} words`}</Badge>
                    </Inline>
                </Stack>
            </Card>
        </FormField>
    );
});

export default RenderReadingTime;