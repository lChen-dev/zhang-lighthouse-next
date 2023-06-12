/* eslint-disable @typescript-eslint/interface-name-prefix */
export default interface Boundary {
  SW: number[];
  NE: number[];
}

export interface GoogleBounds {
  ne: { lat: number, lng: number },
  sw: { lat: number, lng: number },
}

export function fromGoogleBounds(bounds: GoogleBounds): Boundary {
  return {
    NE: [bounds.ne.lng, bounds.ne.lat],
    SW: [bounds.sw.lng, bounds.sw.lat],
  };
}

export function toGoogleBounds(boundary: Boundary): GoogleBounds {
  return {
    ne: { lng: boundary.NE[0], lat: boundary.NE[1] },
    sw: { lng: boundary.SW[0], lat: boundary.SW[1] },
  }
}