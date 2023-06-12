/**
 * this file contains JSON  meant to use for static pages only
 * for PDP pages we will use next-seo.ProductJsonLd so we can tell google about pricing and rating
 */

export default {
  '@context': 'http://schema.org',
  '@type': 'WebSite',
  name: 'Lighthouse.app',
  alternateName: 'Lighthouse',
  url: 'https://lighthouse.app/',
  hasPart: {
    '@type': 'WebPage',
    url: 'https://lighthouse.app/',
    name: 'Lighthouse.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Lighthouse.app',
    alternateName: 'Lighthouse',
    brand: 'Lighthouse.com',
    logo: 'https://lighthouse.app/static/assets/Icons/logo.svg',

    sameAs: [
      'http://www.facebook.com/lighthouse.rewards',
      'http://www.twitter.com/lhapts',
      'https://instagram.com/lighthouserewards',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '33 Tehama St',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
    parentOrganization: [
      {
        '@type': 'Corporation',
        url: 'http://www.lighthoouse.app/',
        name: 'Lighthouse',
        tickerSymbol: '',
        legalName: 'Lighthouse Financial Technologies, Inc.',
        sameAs: [
          'https://www.crunchbase.com/organization/lighthouse',
          'https://www.linkedin.com/company/costar-group/',
          'https://www.facebook.com/lighthouserewards/',
          'https://twitter.com/lhapts/',
          'https://www.instagram.com/lighthouserewards',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '33 Tehama St. Apt. 30e',
          addressLocality: 'San Francisco',
          addressRegion: 'CA',
          postalCode: '94105',
          addressCountry: 'US',
        },
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-859-992-6338',
        contactType: 'customer service',
        contactOption: 'TollFree',
        areaServed: 'US',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-859-992-6338',
        contactType: 'sales',
        contactOption: 'TollFree',
        areaServed: 'US',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-859-992-6338',
        contactType: 'billing support',
        contactOption: 'TollFree',
        areaServed: 'US',
      },
    ],
  },
};
