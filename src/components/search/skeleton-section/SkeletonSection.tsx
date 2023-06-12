import React, { FC } from 'react';
import './SkeletonSection.css';

const SkeletonSection: FC = () => (
  <div className="skeleton">
    <div className="input-skeleton flex items-center justify-between mb-4">
      <div className="skeleton-box" style={{ margin: 0, padding: 0, width: 188, height: 10 }} />
      <div>
        <svg width="14" opacity={0.08} height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>

    {[...Array(10).keys()].map((item) => (
      <div key={item} className="item-skeleton pt-0 mb-3 mr-5 flex">
        <div
          className="skeleton-box"
          style={{
            display: 'block',
            width: '162px',
            height: '100%',
            marginTop: '0',
            paddingTop: '0',
          }}
        />
        <div className="lines-skeleton px-4 inline-block pt-1">
          <div className="skeleton-box" style={{ width: 143, height: 17, margin: '28px 0 8px' }} />
          <div className="flex mb-3">
            <div className="skeleton-box-short" style={{ width: 61, height: 17, marginRight: 8 }} />
            <div className="skeleton-box-short" style={{ width: 61, height: 17 }} />
          </div>
          <div className="flex items-center" style={{ marginBottom: 8 }}>
            <div className="skeleton-box-short" style={{ width: 17, height: 17, marginRight: 8, padding: 0 }} />
            <div
              className="skeleton-box"
              style={{ display: 'flex', width: 200, height: 10, margin: 0, paddingTop: 3 }}
            />
          </div>
          <div className="flex items-center">
            <div className="skeleton-box-short" style={{ width: 17, height: 17, marginRight: 8, padding: 0 }} />
            <div
              className="skeleton-box"
              style={{ display: 'flex', width: 200, height: 10, margin: 0, paddingTop: 3 }}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonSection;
