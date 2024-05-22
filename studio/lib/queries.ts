// ./sanity/lib/queries.ts

import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "article"]`;

/* export const POST_QUERY = groq`*[_type == "article" && slug.current == $slug][0]`; */