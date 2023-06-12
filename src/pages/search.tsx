import SearchPage from '@components/search/Search';
import { UserProvider } from '@components/shared/UserProvider';
import { useFetchUser } from '@hooks/user';

import '../../public/static/assets/css/style.css';
import '../../public/static/assets/css/search.css';
import '../../public/static/assets/css/dark.css';
import blockVisitors from '@utils/block-visitors';
import { getCity, getResponseById } from '@utils/typeform';

const Search = () => {
  const { data: user } = useFetchUser();
  return (
    <UserProvider value={{ user: user ?? null }}>
      <SearchPage />
    </UserProvider>
  );
};

export const getServerSideProps: any = async ({ query, req, res }: any) => {
  if (blockVisitors({ req, res })) {
    res.end('');
    return {};
  }

  const { response_id: responseId } = query;
  if (responseId) {
    const response = await getResponseById(responseId);
    const city = getCity(response);
    if (city) {
      return {
        redirect: {
          destination: `/search?city=${city}`,
          permanent: false,
        },
      };
    }
  }

  const { ne, sw, city } = query;
  if ((!ne || !sw) && !city) {
    return {
      redirect: {
        destination:
          '/search?ne=-96.7680203964039&ne=32.85139886255895&sw=-96.83239341276132&sw=32.734223656745&zoom=14',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Search;
