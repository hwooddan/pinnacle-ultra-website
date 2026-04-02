export default {
  name: 'homePage',
  type: 'document',
  title: 'Home Page Content',
  fields: [
    {
      name: 'welcomeTitle',
      type: 'string',
      title: 'Welcome Headline',
      description: 'Main title (Use a hyphen for the subtitle, e.g., Title - Subtitle)'
    },
    {
      name: 'welcomeText',
      type: 'text',
      title: 'Welcome Message',
      description: 'The main bio or introductory text'
    },
    {
      name: 'profileImage',
      type: 'image',
      title: 'Profile Image',
      options: {
        hotspot: true // Allows Andrea to crop her face perfectly in the Studio
      }
    },
  ],
}