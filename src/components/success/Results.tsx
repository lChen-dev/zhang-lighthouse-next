/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

import LeadFormDialog from '@components/lookup/LeadFormDialog';
import useSearch from '@hooks/search';
import { Property } from '@models/Property';
import { BuildingLead } from '@components/lookup/LeadForm';

import Result from './Result';

const SuccessResults: React.FC = () => {
  const { results }: any = useSearch();
  const [buildingLead, setBuildingLead] = useState<BuildingLead | null>(null);
  return (
    <div className="w-full mx-auto">
      <LeadFormDialog lead={buildingLead} onHide={() => setBuildingLead(null)} />
      <div className="block max-w-6xl mx-auto grid lg:grid-cols-2 grid-cols-1 xl:gap-4 gap-2">
        {results ? (
          (results || []).map((result: Property, key: any) => (
            <Result key={key} result={result} showLead={setBuildingLead} />
          ))
        ) : (
          <div className="block">
            <img
              src="/static/assets/images/loader.gif"
              alt="loader"
              width="80px"
              className="block lg:float-right mx-auto relative pt-20"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessResults;
