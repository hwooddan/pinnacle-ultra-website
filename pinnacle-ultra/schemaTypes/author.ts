export default {
  name: 'author',
  type: 'document',
  title: 'Andrea Bio',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'bio', type: 'text', title: 'Full Bio' },
    { name: 'image', type: 'image', title: 'Coach Photo', options: { hotspot: true } },
    { name: 'credentials', type: 'array', title: 'Certifications', of: [{type: 'string'}] }
  ]
}