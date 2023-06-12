import React, { useEffect } from 'react';
import { loadScript } from '@utils/helpers';

const Reviews: React.FC = () => {
  useEffect(() => {
    loadScript(['//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'], [{ attr: 'defer', value: 'true' }]);
  }, []);
  return (
    <>
      <div className="block py-10 bg-green">
        <div className="trustpilot-container bg-green" style={{ maxHeight: '45px' }}>
          <div
            className="trustpilot-widget"
            data-locale="en-US"
            data-template-id="5613c9cde69ddc09340c6beb"
            data-businessunit-id="5e73488244891200011a63e0"
            data-style-height="100%"
            data-style-width="100%"
            data-theme="dark">
            <a
              href="https://www.trustpilot.com/review/lighthouse.app"
              target="_blank"
              rel="noopener noreferrer">
              Trustpilot
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
