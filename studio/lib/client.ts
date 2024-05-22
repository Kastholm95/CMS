import { createClient } from "next-sanity";

export const client = createClient({
  projectId: 'ikbzpczn',
  dataset: "production",
  apiVersion: "2024-03-25",
  useCdn: true,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});
