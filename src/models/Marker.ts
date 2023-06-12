export default interface Marker {
  id: string;
  lng: number;
  lat: number;
  srcs: string[];
  title: string;
  minBed: number;
  maxBed: number;
  reward: number;
  prices: number[];
  price: number;
}
