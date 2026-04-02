export default {
  name: 'post',
  type: 'document',
  title: 'Blog Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' }
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main Image'
    },
    {
      name: 'body',
      type: 'text',
      title: 'Post Content'
    }
  ]
}