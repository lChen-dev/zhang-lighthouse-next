import { useWindowWidth } from '@react-hook/window-size';
import Skeleton from 'react-loading-skeleton';

import { Property } from '@models/Property';

import Result from '@components/search/Result';

export interface Props {
  results: Property[];
  resultsStyle?: { [key: string]: string | number | undefined };
  markerSelectedId: string | null;
  onMouseIn: (result: Property) => void;
  onMouseOut: (id: string | null) => void;
  show: boolean | null;
}

export default function DesktopList({ results, resultsStyle, onMouseIn, onMouseOut, markerSelectedId, show }: Props) {
  const width = useWindowWidth();

  if (!show) return null;

  return (
    <div
      className="md:col-span-4 col-span-12 md:h-screen h-screen-20 md:overflow-y-scroll overflow-y-hidden overflow-x-scroll px-3 shadow-sm md:block md:flex flex-col hidden desktoplistcontainer"
      key={Number.isFinite(width) ? width : Date.now()}
      style={resultsStyle}>
      {results
        ? results.map((result: Property) => (
            <Result
              key={`${result.id}-desktop`}
              result={result}
              onMouseIn={() => onMouseIn(result)}
              onMouseOut={() => onMouseOut(null)}
              hoveredId={markerSelectedId}
            />
          ))
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div className="flex mb-2 shadow-xs rounded pt-0 mt-0" key={i}>
              <div className="pt-0 mt-0">
                <Skeleton
                  style={{
                    width: '128px',
                    height: '128px',
                    marginTop: '0',
                    paddingTop: '0',
                    position: 'relative',
                    top: '-2px',
                    left: '2px',
                  }}
                />
              </div>
              <div className="w-full px-4 inline-block pt-1">
                <Skeleton style={{ width: '100%', height: '40px', marginBottom: '10px' }} />
                <Skeleton style={{ width: '100%', height: '10px' }} />
                <Skeleton style={{ width: '100%', height: '10px' }} />
                <Skeleton style={{ width: '100%', height: '10px' }} />
              </div>
            </div>
          ))}
      {results && results.length === 0 && (
        <h4 className="text-gray-500 text-center md:mt-40 mt-10 text-2xl w-full">No results found</h4>
      )}
    </div>
  );
}
