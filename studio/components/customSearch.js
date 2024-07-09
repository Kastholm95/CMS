import { defineSearchFunction } from 'sanity/structure'

export const customSearch = defineSearchFunction((searchQuery, context) => {
  const { documentStore } = context
  const documents = documentStore.getAll()
  
  return documents
    .filter(doc => doc._type === 'article' && doc.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(doc => ({
      _id: doc._id,
      _type: doc._type,
      _score: 1,
      _weak: false,
      _createdAt: doc._createdAt,
      _updatedAt: doc._updatedAt,
      title: doc.title,
      slug: doc.slug
    }))
})
