export interface Property {
  id: string;
  name: string;
  info: string;
  promos: string;
  cashback: number;
  website: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  coordinates: { coordinates: [number, number] };
  amenities: { name: string; category: string }[];
  unitCount: number;
  minRent: number;
  yearBuilt: number;
  floors: number;
  shortDescription: string;
  longDescription: string;
  leaseLength: string;
  uniqueFeatures: string;
  creditCheck: boolean;
  secondChance: boolean;
  floorplan: Floorplan[];
  propertyPhotos: PropertyPhoto[];
  meta: PropertyMeta[];
  apts_id?: string;
  hasLiveData?: boolean;
  nanoId: string;
  isFavorite?: boolean;
}

export interface PropertyMarker extends Property {
  maxRent: number;
  minBeds: number;
  maxBeds: number;
}

export interface Floorplan {
  minRent: number;
  maxRent: number;
  bedroomCount: number;
  bathroomCount: number;
  name: string | null;
  sqftRange: object | null; // '(1000,2000]' - 1000 exclusive and 2000 inclusive
  sqftAvg: number | null;
  rentRange: object;
  rentAvg: number;
  deposit: number;
  unitsAvailable: number;
  unitsCount: number;
  propertyId: string;
}

export interface PropertyPhoto {
  id: string;
  url: string;
  rank?: any;
}

export interface PropertyMeta {
  category: string;
  name: string;
  value: string | null;
}
