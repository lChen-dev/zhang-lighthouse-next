import React from 'react';
import { CardSkeleton } from './Skeletons';
import '../../../../../public/static/assets/css/blog.css';

/* loading card renderes */

const LoadingSkeleton: React.FC<any> = () => {
  return (
    <div className="col-span-1">
      <div className="grid grid-cols-3 gap-8">
        {[1, 2, 3].map((value: number) => {
          return (
            <div className="col-span-1">
              <CardSkeleton height={309} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
