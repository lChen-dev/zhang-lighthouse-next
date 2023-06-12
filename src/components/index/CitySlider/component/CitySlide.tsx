import { numberWithCommas } from '@utils/format';

const CitySlide = ({
  image,
  imageAlt,
  cashback,
  cityName,
  minPrice = 0,
  maxPrice = 0,
}: {
  image: string;
  imageAlt: string;
  cashback: number;
  cityName: string;
  minPrice?: number;
  maxPrice?: number;
}): React.ReactElement => {
  const priceRange = Array.from(new Set([minPrice, maxPrice]))
    .filter((e) => e != null && e > 0)
    .sort()
    .map((e) => numberWithCommas(e))
    .join(' - ');
  return (
    <div
      className="bg-white relative city-container cursor-pointer block mx-auto"
      style={{ width: '300px', height: '416px', maxWidth: '300px' }}>
      <img src={image} className="absolute w-full h-full z-10 block citySliderImg" alt={imageAlt} />
      <div className="cashback-tooltip">
        <div className="cashback-description flex w-full relative">
          <p className="block orange-dot relative" />
          <p className="block text-white font-circular font-medium text-14px">${cashback} cashback monthly</p>
        </div>
      </div>
      <div
        className="city-description flex text-black font-circular px-2 absolute z-40 left-0 w-full"
        style={{
          bottom: '10px',
        }}>
        <div className="city-description-bg rounded-md bg-white w-full flex px-2" style={{ height: '46px' }}>
          <p className="text-black font-circular pr-2 font-medium text-16px">{cityName}</p>
          <p className="text-template font-normal text-14px font-circular">$ {priceRange}</p>
        </div>
      </div>
    </div>
  );
};

export default CitySlide;
