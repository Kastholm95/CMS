import { defineType, defineField } from 'sanity';
import { FaBook as icon } from "react-icons/fa";
import { readMoreAutomaticPreview } from './readMoreAutomaticPreview';

// Custom input component that renders nothing
const EmptyInput = () => null;

export const readMoreAutomaticType = defineType({
  name: 'readMoreAutomatic',
  type: 'object',
  title: 'Auto - Læs mere',
  icon: icon,
  fields: [
    defineField({
      name: 'emptyArray',
      title: 'Efterlades tomt da artiklerne automatisk bliver tilføjet',
      type: 'array',
      of: [], 
      components: {
        input: EmptyInput,
      },
    }), 
  ],
  components: {
    preview: readMoreAutomaticPreview,
  },
});
