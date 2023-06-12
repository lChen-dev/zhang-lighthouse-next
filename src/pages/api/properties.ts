import { NextApiHandler } from 'next';

import { getSearchFromQuery, getQueryObjectFromSearch } from '@models/Search';
import { toGoogleBounds } from '@models/Boundary';
import { createHttpClient } from '@utils/http';
import { sentryCaptureException } from '@utils/sentry';

import allLocations from '../../components/funnel/locations.json';

const generateBounds = (bounds: any) => {
  const {
    northeast: { lat: nt, lng: nl },
    southwest: { lat: st, lng: sl },
  } = bounds;
  return { SW: [sl, st], NE: [nl, nt] };
};

const convertBuildingsToProperties = (buildings: any, boundary: any) => {
  const properties = buildings.map((building: any) => {
    let minPrice = Infinity;
    let maxPrice = 0;

    for (let key in building.prices) {
      if (!key.includes('Size')) {
        if (building.prices[key] > maxPrice) {
          maxPrice = building.prices[key];
        }

        if (building.prices[key] < maxPrice) {
          minPrice = building.prices[key];
        }
      }
    }

    const images = building.image.map(({ file }: any) => {
      return {
        src: file,
        width: null,
        height: null,
        caption: '',
      };
    });

    let minBed = Infinity;
    let maxBed = 0;

    const floorPlans = building.units.map((unit: any) => {
      return {
        model: unit.bed,
        minPrice: unit.minPrice,
        bedrooms: unit.bed,
        bathrooms: 1,
        sqFt: null,
        image: {
          src:
            'https://resource.avalonbay.com/floorplans/CA591/CA591-A4-1-770sq.jpg',
          width: null,
          height: null,
          caption: 'This is a caption',
        },
      };
    });

    return {
      id: building._id,
      name: building.property_name,
      description: 'This is a description',
      neighborhood: 'This is a neighborhood',
      website: '',
      address: building.address,
      city: building.city,
      state: building.state,
      zip: building.zip,
      coordinates: building.location.coordinates,
      yearBuilt: '2001',
      shortDescription: 'This is a short description',
      longDescription: 'This is a long description',
      creditCheck: true,
      secondChance: true,
      minBed: minBed,
      maxBed: maxBed,
      minPrice: minPrice,
      maxPrice: maxPrice,
      cashBack: building.cash_reward || 0,
      images: images,
      floorPlans: Object.values(floorPlans),
      searchLocation: toGoogleBounds(boundary),
    };
  });
  return properties;
};

const search: NextApiHandler = async (req, res) => {
  try {
    const query = req.query;
    const location = query.location || 'Houston, TX, USA';
    let boundaries = [];

    query.bedrooms = query['bedrooms[]'];

    if (query['ne[]'] && query['sw[]']) {
      const boundaryObject = {
        NE: query['ne[]'],
        SW: query['sw[]'],
      };
      boundaries.push(boundaryObject);
    } else {
      boundaries = allLocations
        .filter(({ name }) => name === location)
        .map(({ bounds }) => generateBounds(bounds));
    }
    const boundary = boundaries[0];
    const search = Object.assign({}, getSearchFromQuery(query), {
      boundary,
      skip: 0,
      limit: 50,
      sort: 0,
      page: 0,
    });
    const params = getQueryObjectFromSearch(search);
    const client = createHttpClient('');
    const { data } = await client.request({
      url: '/search',
      params,
      method: 'GET',
    });
    const properties = convertBuildingsToProperties(data.buildings, boundary);
    res.json(properties);
  } catch (error: any) {
    sentryCaptureException({
      info: 'Properties API: Unable to get search response',
      error,
    });
    res.status(error.status || 500).end(error.message);
  }
};

export default search;
