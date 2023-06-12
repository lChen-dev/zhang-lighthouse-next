import { B1 } from '@components/shared/Typography';
import { Property } from '@models/Property';
import Skeleton from 'react-loading-skeleton';
import { H4 } from '../shared/Typography';

export default function Description({ property }: { property?: Property }) {
  if (!property)
    return (
      <div>
        <Skeleton />
        <Skeleton />
      </div>
    );

  if (!property.hasLiveData) return null;

  return (
    <div>
      <H4>Description</H4>
      <B1>{property?.longDescription}</B1>
    </div>
  );
}
