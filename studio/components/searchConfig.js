// searchConfig.js
export default {
  documentTypes: ['article'],
  fields: {
    title: {
      boost: 10,
      query: {
        match: {
          operator: 'and'
        }
      }
    },
    overview: {
      boost: 1,
      query: {
        match: {
          operator: 'and'
        }
      }
    }
  }
}
