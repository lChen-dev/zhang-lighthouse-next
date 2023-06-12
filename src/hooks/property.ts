import useSWR from 'swr';
import { unAuthed } from '@utils/http';

import { Property } from '@models/Property';
import { useWishlists } from '@hooks/account';

export default function useProperty(id: string): Property | undefined {
  const { data: wishlist } = useWishlists({ hideErrorPopup: true });
  const { data: property } = useSWR<Property>(
    `/properties/${id}`,
    async () => {
      return (await unAuthed.get(`/properties/${id}`, { timeout: 1000 * 60 })).data;
    },
    { dedupingInterval: 1000 }
  );

  if (wishlist && property) property.isFavorite = wishlist.some((item) => item.id === property.id);

  return property;
}
