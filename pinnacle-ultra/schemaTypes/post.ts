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
      title: 'Main Image',
      options: { hotspot: true } // Allows cropping the perfect thumbnail
    },
    {
      name: 'body',
      title: 'Post Content',
      type: 'array', 
      of: [
        {
          type: 'block' // This handles the standard text, bolding, lists, etc.
        },
        {
          type: 'image',
          options: { hotspot: true },
          title: 'Inline Image'
        }
      ]
    }
  ]
}