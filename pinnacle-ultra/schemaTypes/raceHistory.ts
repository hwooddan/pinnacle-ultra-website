export default {
  name: 'racehistory',
  title: 'Race History',
  type: 'document',
  fields: [
    { name: 'raceName', title: 'Race Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'year', title: 'Year', type: 'string' },
    { name: 'distance', title: 'Distance', type: 'string' },
    { name: 'time', title: 'Finish Time', type: 'string' },
    { name: 'position', title: 'Position/Rank', type: 'string' },
    { name: 'raceUrl', title: 'Race Website', type: 'url' },
    { name: 'raceImage', title: 'Race Photo', type: 'image', options: { hotspot: true } },
  ],
}