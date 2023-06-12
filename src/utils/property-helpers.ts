import { Floorplan, Property } from '@models/Property';

export const getMaxRent = (floorplan: Floorplan[]) => Math.max(...floorplan.map((f) => f.maxRent));
export const getMinRent = (floorplan: Floorplan[]) => Math.min(...floorplan.map((f) => f.minRent));

export const getBedroomRange = (floorplan: Floorplan[]) => {
  const min = Math.min(...floorplan.map((f) => f.bedroomCount));
  const max = Math.max(...floorplan.map((f) => f.bedroomCount));
  return [min, max];
};

interface CategoryAttributes {
  [key: string]: string | null | undefined;
}

export interface SocialCategory extends CategoryAttributes {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
}

export const getMetaCategory = <R extends CategoryAttributes>(category: string, property?: Property): R => {
  const attrs: R = {} as R;
  if (property && property.meta) {
    property.meta
      .filter((data) => data.category === category)
      .forEach((data) => {
        attrs[data.name as keyof R] = data.value as any;
      });
  }
  return attrs;
};
