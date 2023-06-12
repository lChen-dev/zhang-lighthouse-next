import Prismic from '@prismicio/client';

export default Prismic.client('https://lighthouseapp.cdn.prismic.io/api/v2', {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
});
