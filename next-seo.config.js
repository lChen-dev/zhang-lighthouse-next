export default {
  title: 'Lighthouse',
  description: 'Find exclusive apartments that pay to have you.',
  test: ['apartment for rent', 'apartment listing', 'renting apartment, apartment to rent, apartment online'],
  additionalMetaTags: [
    {
      name: 'description',
      content:
        'Lighthouse is a next-gen rental site. Find exclusive apartments that pay to have you and get monthly cash back. ',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'rating',
      content: '5',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1',
    },
    {
      property: 'Content-Type',
      content: 'text/html;charset=UTF-8',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://lighthouse.app',
    site_name: 'Lighthouse',
    title: 'Lighthouse',
    description: 'Find exclusive apartments that pay to have you.',
  },
  twitter: {
    handle: '@lhapts',
    site: '@lhapts',
    description: 'Find exclusive apartments that pay to have you.',
    title: 'Lighthouse',
    creator: '@lhapts',
    cardType: 'summary_large_image',
  },
};
