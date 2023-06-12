import { RatingStarIcon, } from '@components/shared/Icons'

interface IRating {
  rating: number;
  iconHeight?: number;
  iconWidth?: number;
}

export const Rating: React.FC<IRating> = ({rating, iconHeight, iconWidth}: IRating) => {
  const elements = guessElements(rating);
  return <div className="flex flex-nowrap"> 
    { elements.map(status => <RatingStarIcon status={status} height={iconHeight} width={iconWidth} />) }
  </div>
}

const guessElements = (_rating: number) => {
  const float = isFloat(_rating);
  const rating = Math.floor(_rating);
  const ret = [...Array(5)].fill('FULL', 0, rating);

  if (float){
    ret.fill('HALF', rating)
    ret.fill('BLANK', rating+1, 5)
    return ret;
  }
  
  ret.fill('BLANK', rating, 5)  
  return ret;
}


const isFloat = (n: number) => Number(n) === n && n % 1 !== 0;