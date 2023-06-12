import { useWindowWidth } from '@react-hook/window-size';

import { Property } from '@models/Property';

import MobileResult from '@components/search/MobileResult';

export interface Props {
  results: Property[];
  markerSelectedId: string | null;
}

export default function MobileVerticalList({ results, markerSelectedId }: Props) {
  const width = useWindowWidth();

  if (width >= 768) return null;

  return (
    <>
      <div
        className="mt-4 md:hidden w-screen h-screen overflow-y-scroll overflow-x-hidden shadow-sm flex flex-col items-center align-center bg-white"
        key={Number.isFinite(width) ? `${width}-vert-list` : `${Date.now()}-ver-list`}>
        {results &&
          results.map((result: Property) => (
            <MobileResult
              key={`${result.id}-vertical`}
              result={result}
              onMouseIn={() => null}
              onMouseOut={() => null}
              hoveredId={markerSelectedId}
              scrollIntoView={false}
            />
          ))}
        {results && results.length === 0 && (
          <h4 className="text-gray-500 text-center md:mt-40 mt-10 text-2xl w-full">No results found</h4>
        )}
      </div>
    </>
  );
}
