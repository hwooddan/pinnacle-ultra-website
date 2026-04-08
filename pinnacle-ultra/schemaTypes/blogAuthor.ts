export default {
  name: 'blogAuthor',
  title: 'Authors',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Author Photo',
      type: 'image',
      options: { hotspot: true }, // Allows Andrea to crop the face perfectly
    },
    {
      name: 'bio',
      title: 'Mini Bio',
      type: 'text', // A short 2-3 sentence description
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'website',
      title: 'Personal Website',
      type: 'url',
    },
  ],
}