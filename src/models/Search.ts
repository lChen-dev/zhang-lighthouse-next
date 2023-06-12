import Boundary from './Boundary';

export default interface Search {
  id?: string;
  location: string;
  bedrooms?: number[];
  minPrice?: number;
  maxPrice?: number;
  showFunnel?: boolean;
  step?: number;
  boundary: Boundary;
  skip?: number;
  limit?: number;
  page?: number;
  total?: number;
  markers?: object[];
  sort?: number;
}

export interface SearchQuery {
  location: string;
  ne: number[];
  sw: number[];
  bedrooms?: number[];
  minPrice?: number;
  maxPrice?: number;
  skip?: number;
  limit?: number;
  sort?: number;
  page?: number;
}

export const getQueryObjectFromSearch = (search: Search): SearchQuery => ({
  location: search.location,
  ne: search.boundary.NE,
  sw: search.boundary.SW,
  bedrooms: search.bedrooms,
  minPrice: search.minPrice,
  maxPrice: search.maxPrice,
  skip: search.skip,
  limit: search.limit,
  sort: search.sort,
  page: search.page,
});

export const getSearchFromQuery = (query: any): Search => ({
  location: query.location,
  boundary: {
    NE: query.ne,
    SW: query.sw,
  },
  bedrooms: Array.isArray(query.bedrooms) ? query.bedrooms.map(parseInt) : [parseInt(query.bedrooms, 10)],
  minPrice: query.minPrice,
  maxPrice: query.maxPrice,
  skip: query.skip,
  limit: query.limit,
  sort: query.sort,
  page: query.page,

  markers: [],
  showFunnel: false,
  step: 0,
});
