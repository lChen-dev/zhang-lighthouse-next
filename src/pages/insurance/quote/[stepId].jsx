import Error from 'next/error';

import '../../../styles/globals.css';
import '../../../components/quoteflow/styles.css';
import { validateSession } from '@utils/auth';
import { createHttpClient } from '@utils/http';
import { sentryGetServerSideProps } from '@utils/sentry';
import QuoteFlow from '../../../components/quoteflow/index';

let oldStatusCode; // in case component update and wasn't a proper redirect

function Quote(props) {
  let statusCode;
  // eslint-disable-next-line react/destructuring-assignment
  if (props?.hasOwnProperty('props')) {
    const { props: properties } = props;
    statusCode = properties.statusCode;
  }
  oldStatusCode = statusCode || oldStatusCode;
  if (oldStatusCode === 404) return <Error statusCode={oldStatusCode} />;

  return <QuoteFlow />;
}

export const getServerSideProps = sentryGetServerSideProps(async ({ req, res, query }) => {
  const validSlugs = [
    'name',
    'building-type',
    'address',
    'move-in-date',
    'core-policies',
    'add-ons',
    'final-steps',
    'payment',
    'confirm',
    'interested-party',
  ];
  const stepId = query?.stepId;
  const statusCode = validSlugs.includes(stepId) ? 200 : 404;
  res.statusCode = statusCode;
  if (statusCode === 404) {
    return {
      props: {},
      redirect: {
        destination: '/insurance',
        permanent: false,
      },
    };
  }
  const userId = await validateSession(req);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/?post_login_url=/insurance',
        permanent: false,
      },
    };
  }

  const client = createHttpClient(req.headers.cookie, { validateStatus: () => true });
  const {
    data: { homecredits },
  } = await client.get('/dashboard/credits');
  return { props: { homecredits } };
});

export default Quote;
