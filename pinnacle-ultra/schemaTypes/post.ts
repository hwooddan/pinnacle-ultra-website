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
      options: { hotspot: true }
    },
    /* 1. MOVED AUTHOR HERE: It is now a top-level field */
    {
      name: 'author', 
      title: 'Guest Author',
      type: 'reference',
      to: [{ type: 'blogAuthor' }],
    },
    {
      name: 'body',
      title: 'Post Content',
      type: 'array', 
      of: [
        {
          type: 'block' 
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