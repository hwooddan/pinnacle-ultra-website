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
      validation: (Rule: any) => Rule.required().min(10).max(300),
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