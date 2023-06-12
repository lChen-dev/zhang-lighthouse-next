import { sentryCaptureException } from '@utils/sentry';
import Prismic from '@prismicio/client';
import Client from '@components/blog/utils/prismicClient';

export default async function fetchBlogLandingData(): Promise<any> {
  const response = await Client.query(Prismic.Predicates.at('document.type', 'blog_landing'));
  if (response) {
    if (response.results.length > 0) {
      return response.results[0];
    }
  }
  return null;
}

export async function fetchAllPostsData(): Promise<any> {
  const query = await Client.query([Prismic.Predicates.any('document.type', ['city_guide', 'individual_post'])])
    .then((response) => {
      return response?.results;
    })
    .catch((err) => {
      sentryCaptureException({ info: 'Error while loading all posts', error: err });
    });
  return query;
}

export async function fetchPostCityFilterData(key: any): Promise<any> {
  const query = await Client.query([Prismic.Predicates.at('document.type', `${key}`)])
    .then((response) => {
      return response?.results;
    })
    .catch((err) => {
      sentryCaptureException({ info: 'Error while loading post city filter posts', error: err });
    });
  return query;
}

export async function fetchTagFilterData(key: any): Promise<any> {
  const query = await Client.query([Prismic.Predicates.any('document.tags', [`${key}`])])
    .then((response) => {
      return response?.results;
    })
    .catch((err) => {
      sentryCaptureException({ info: 'Error while loading tag filter posts', error: err });
    });
  return query;
}

export async function fetchFullTextSearchData(keyword: any): Promise<any> {
  const query = await Client.query([
    Prismic.Predicates?.any('document.type', ['individual_post', 'city_guide']),
    Prismic.Predicates?.fulltext('document', keyword),
  ])
    .then((response) => {
      return response?.results;
    })
    .catch((err) => {
      sentryCaptureException({ info: 'Error while searching with text.', error: err });
    });
  return query;
}

export async function fetchCitySearchData(keyword: any): Promise<any> {
  const query = await Client.query([
    Prismic.Predicates?.at('document.type', 'city_guide'),
    Prismic.Predicates?.fulltext('document', keyword),
  ])
    .then((response) => {
      return response?.results;
    })
    .catch((err) => {
      sentryCaptureException({ info: 'Error while searching with city.', error: err });
    });
  return query;
}

export async function fetchPopularNewData(filter: any): Promise<any> {
  const response = await Client.query(Prismic.Predicates.at('document.type', 'blog_landing'))
    .then((_response) => {
      return _response?.results[0];
    })
    .catch((err) => sentryCaptureException({ info: 'error in BlogPage Server Side Props', error: err }));
  const toQuery = response?.data?.body?.find((elem: { slice_label: string }) => elem.slice_label === filter);
  const arrToQuery = toQuery?.items?.map((item: any) => {
    return item?.posts?.id || '';
  });
  const popularNewDataQuery = await Client.getByIDs(arrToQuery, { lang: '*' })
    .then((_data: any) => {
      return _data?.results;
    })
    .catch((err) => {
      sentryCaptureException({ info: 'Error, while rendering Popular New Data', error: err });
    });
  return popularNewDataQuery;
}

/* output: thom-choice => Thom Choice */
export const processNameString = (name: string): string => {
  const res = [];
  let dashProcessed = false;
  if (name) {
    for (let i = 0; i < name.length; i++) {
      if (i === 0) {
        res.push(name[i].toUpperCase());
      } else if (name[i] === '-') {
        res.push(' ');
        dashProcessed = true;
      } else if (dashProcessed) {
        res.push(name[i].toUpperCase());
        dashProcessed = false;
      } else {
        res.push(name[i]);
      }
    }
    return res.join('');
  }
  return '';
};

/* output: Thom Choice => thom-choice */
export const processAuthorString = (name: any): any => {
  const res = [];
  if (name) {
    const smallerCase = name.toLowerCase();
    for (let i = 0; i < smallerCase.length; i++) {
      if (smallerCase[i] === ' ') {
        res.push('-');
      } else {
        res.push(smallerCase[i]);
      }
    }
    return res.join('');
  }
  return '';
};

/* output: Houston, TX => houston-tx */
export const processCityString = (_name: any): any => {
  const res = [];
  if (_name) {
    const smallerCase = _name.toLowerCase();
    for (let i = 0; i < smallerCase.length; i++) {
      if (smallerCase[i] === ',') {
        res.push('');
      } else if (smallerCase[i] === ' ') {
        res.push('-');
      } else {
        res.push(smallerCase[i]);
      }
    }
    return res.join('');
  }
  return '';
};

export async function fetchCityPosts(): Promise<any> {
  const query = await Client.query([Prismic.Predicates.at('document.type', 'city_guide')])
    .then((response) => {
      return response?.results;
    })
    .catch((err) => {
      sentryCaptureException({ info: 'Error while searching with text.', error: err });
    });
  return query;
}

/* requires id="top" in html tag */
export const scrollToTop = (): any => {
  const element = document.getElementById('top');
  element?.scrollIntoView();
};
