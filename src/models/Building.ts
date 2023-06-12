import Boundary from './Boundary';

export default interface Building {
  _id: string;
  maxBed: any;
  minBed: any;
  location: any;
  cashBack: number;
  property_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  minPrice: number;
  maxPrice: number;
  cash_reward: any;
  prices: [{
    [key: string]: string;
  }];
  detail: [{
    description: string;
    Amenities: Amenities;
  }];
  units: any;
  image: { file: string }[];
  search_location: { // TODO: this feels wrong...
    name: string;
    boundary: Boundary;
  };
}

export interface Amenities {
  PropertyInfo: [];
  PetPolicy: [{
    heading: string;
    description: string;
    list: string;
  }];
  UniqueFeatures: string[];
  FitnessFeatures: string[];
  KitchenFeatures: string[];
  livingSpace: string[];
  others: string[];
  services: string[];
  parking: [{
    heading: string;
    description: string;
    list: string;
  }];
  lease: string[];
  outdoorSpace: string[];
  studentFeatures: string;
  securityFeatures: string[];
  units: [{
    bed: number;
    bath: number;
    size: number;
    name: string;
    minPrice: number;
    maxPrice: number;
    isAvailable?: string;
  }];
  PropertyManagementCompany: string;
  submarket: string;
  Phones: string;
  nearby: {};
  schools: [{
    type: string;
    name: string;
    grade: string;
    phone: string;
  }];
  scores: {
    IsMobile: boolean;
    WalkScore: {
      Title: string;
      Score: string;
      Status: string;
      Description: string;
      Link: string;
      Tagline: string;
    };
    TransitScore: {
      Title: string;
      Score: string;
      Status: string;
      Description: string;
      Link: string;
      Tagline: string;
    };
    SoundScore: {
      AirportLabel: string;
      TrafficLabel: string;
      BusinessLabel: string;
      AirportStatus: string;
      TrafficStatus: string;
      BusinessStatus: string;
      PoweredBy: string;
      Title: string;
      Score: string;
      Status: string;
      Description: string;
    };
  };
  expenses: {
    Recurring: {
      'Assigned Garage Parking': string;
    };
    'One-Time': {
      'Admin Fee': string;
      'Application Fee': string;
      'Cat Fee': string;
      'Dog Fee': string;
    };
  };
}
