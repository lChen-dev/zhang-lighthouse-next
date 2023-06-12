import React, { useRef } from 'react';
import dynamic from 'next/dynamic';

const Stage = dynamic<any>(() => import('react-konva').then((module) => module.Stage), { ssr: false });
const Layer = dynamic<any>(() => import('react-konva').then((module) => module.Layer), { ssr: false });
const Line = dynamic<any>(() => import('react-konva').then((module) => module.Line), { ssr: false });

export interface Props {
  width: number;
  height: number;
  onMouseDown: (e: any) => void;
  onMouseMove: (e: any) => void | undefined;
  onMouseUp: (e: any) => void;
  line: number[];
}

const KonvaWrapper: React.FC<Props> = ({ width, height, onMouseDown, onMouseMove, onMouseUp, line }) => {
  const stageRef = useRef();

  return (
    <div>
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        onMouseDown={onMouseDown}
        onMouseMove={throttle(onMouseMove, 50)}
        onMouseUp={onMouseUp}
        onTouchStart={onMouseDown}
        onTouchMove={throttle(onMouseMove, 50)}
        onTouchEnd={onMouseUp}>
        <Layer>
          <Line
            points={line}
            stroke="#34966D"
            strokeWidth={2}
            tension={0.5}
            lineCap="round"
            globalCompositeOperation="source-over"
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default KonvaWrapper;

function throttle(func: (...vals: any[]) => void, duration: number) {
  let shouldWait = false;
  return (...args: any[]) => {
    if (!shouldWait) {
      func(...args);
      shouldWait = true;
      setTimeout(() => {
        shouldWait = false;
      }, duration);
    }
  };
}
