import { useWindowWidth } from '@react-hook/window-size';
import { motion } from 'framer-motion';

import { Property } from '@models/Property';

import MobileResult from './MobileResult';

export interface Props {
  results: Property[];
  resultsStyle: { [key: string]: string | number | undefined };
  markerSelectedId: string | null;
  onMouseIn: (result: Property) => void;
  onMouseOut: (id: string | null) => void;
  onToggle: () => void;
  show: boolean | null;
  onClose?: () => void;
  setShowAuth?: (e?: any) => any;
}

export default function MobileHorizontalList({
  results,
  onMouseIn,
  onMouseOut,
  markerSelectedId,
  onToggle,
  show,
  onClose,
  setShowAuth,
}: Props): any {
  const width = useWindowWidth();

  return (
    <motion.div
      animate={{
        opacity: show ? 1 : 0,
        transitionEnd: {
          display: show ? 'block' : 'none',
        },
      }}
      key="horizontal-list"
      className="hidden md:hidden w-screen shadow-sm flex">
      <div
        className="w-screen overflow-x-scroll overflow-y-hidden flex"
        key={Number.isFinite(width) ? `${width}-hor-list` : `${Date.now()}-hor-list`}
        style={{ scrollSnapType: 'x mandatory' }}>
        {results &&
          results.map((result: Property) => (
            <MobileResult
              key={`${result.id}-horizontal`}
              result={result}
              onMouseIn={() => onMouseIn(result)}
              onMouseOut={() => onMouseOut(null)}
              hoveredId={markerSelectedId}
              scrollIntoView
              onClose={onClose}
              type="horizontal"
              setShowAuth={setShowAuth}
            />
          ))}
        {results && results.length === 0 && (
          <h4 className="text-gray-500 text-center md:mt-40 mt-10 text-2xl w-full">No results found</h4>
        )}
      </div>
    </motion.div>
  );
}
