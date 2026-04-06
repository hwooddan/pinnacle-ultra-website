export default {
  name: 'review',
  title: 'Client Reviews',
  type: 'document',
  fields: [
    {
      name: 'authorName',
      title: 'Runner Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'raceCompleted',
      title: 'Race/Achievement',
      description: 'e.g., "Finisher: UTMB 100" or "First 50k"',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      validation: Rule => Rule.required(),
    },

{
      name: 'fullStory',
      title: 'Full Success Story',
      type: 'array', 
      of: [{type: 'block'}], // Using Portable Text for better formatting (bold, lists, etc.)
      description: 'The deep-dive review (Up to 300 words).'
    },

    {
      name: 'authorImage',
      title: 'Runner Photo (Optional)',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop their face perfectly
      },
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Use 1 for the first review, 2 for second, etc.',
    },
  ],
}