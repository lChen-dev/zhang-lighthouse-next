import CitySlide from './CitySlide';

const Slides = [
  <CitySlide
    cityName="Los Angeles"
    cashback={150}
    minPrice={1499}
    maxPrice={1799}
    image="static/assets/images/LA.png"
    imageAlt="Los Angeles apartments"
  />,
  <CitySlide
    cityName="New York"
    cashback={150}
    minPrice={1499}
    maxPrice={1799}
    image="static/assets/images/NY.png"
    imageAlt="New York apartments"
  />,
  <CitySlide
    cityName="San Francisco"
    cashback={150}
    minPrice={1499}
    maxPrice={1799}
    image="static/assets/images/SF.png"
    imageAlt="San Francisco apartments"
  />,
  <CitySlide
    cityName="Las Vegas"
    cashback={150}
    minPrice={1499}
    maxPrice={1799}
    image="static/assets/images/LV.png"
    imageAlt="Las Vegas apartments"
  />,
];

export default Slides;
