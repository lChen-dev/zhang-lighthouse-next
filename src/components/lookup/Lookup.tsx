/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/camelcase */
import algoliasearch from 'algoliasearch';
import { Configure, connectHits, InstantSearch } from 'react-instantsearch-dom';
import React, { ComponentClass, useEffect, useState } from 'react';

import LoadingSpinner from '@components/shared/LoadingSpinner';
import AddBuildingForm from '@components/lookup/AddBuildingForm';
import Modal from '@components/shared/Modal';
import LeadFormDialog from '@components/lookup/LeadFormDialog';
import Footer from '@components/shared/Footer';
import { BuildingLead } from '@components/lookup/LeadForm';
import { B1, H1, H2 } from '@components/shared/Typography';
import ButtonCta from '@components/shared/ButtonCta';
import { RightArrowIcon } from '@components/shared/Icons';

import './css/Lookup.css';
import { HitsBlock } from './component/Hits';
import DebouncedSearchBox from './DebouncedSearchBox';

const Lookup = () => {
  const [Algolia, setAlgolia] = useState<any>(null);
  const [buildingLead, setBuildingLead] = useState<BuildingLead | null>(null);
  const [showNewBuilding, setShowNewBuilding] = useState(false);
  const [hits, setHits] = useState<any>(null);

  let debounce: any = null;

  const CustomHits: ComponentClass<any, any> = connectHits(({ hits: records }: any) => {
    if (records.length > 0) {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        setHits(records);
      }, 500);
    }
    return null;
  });

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ALGOLIA_APP_ID && process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY) {
      const algoliaClient = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
      );
      // prevent initial blank search, since algolia is costly we don't want useless searches
      setAlgolia({
        search(requests: any) {
          const shouldSearch = requests.some(({ params: { query } }: any) => query !== '');
          if (shouldSearch) {
            return algoliaClient.search(requests);
          }
          return Promise.resolve({
            results: [{ hits: [] }],
          });
        },
        searchForFacetValues: algoliaClient.searchForFacetValues,
      });
    }
  }, []);

  if (!Algolia) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div
        className="w-full relative flex flex-col items-start xl:items-center"
        style={{
          zIndex: 1,
          background: '#F9F9F9',
        }}>
        <div className="z-20 flex flex-col items-start w-full max-w-screen-xl mx-auto px-6 pt-0 md:pt-16 laptop-md:px-0 md:pt-20 xl:pt-24">
          <H1 weight="font-semibold" className="mt-24 inline-flex flex-col text-left items-start">
            <span style={{ background: '#F9F9F9CC', boxShadow: '0 0 1rem 1rem #F9F9F9CC' }}>Building Explorer</span>
          </H1>
          <B1
            style={{ background: '#F9F9F9CC', boxShadow: '0 0 1rem 1rem #F9F9F9CC' }}
            className="inline-flex flex-col mt-2 lg:mt-8 text-left items-start">
            <span className="text-gray-soft">Know the name of a building you’re interested in? Look it up here.</span>
          </B1>
          <div className="block w-full mb-10">
            <InstantSearch indexName="rebate_lookup" searchClient={Algolia}>
              <Configure hitsPerPage={21} />
              <DebouncedSearchBox
                placeholder="Search apartments with cash back..."
                delay={500}
                onNewBuilding={() => setShowNewBuilding(true)}
              />
              <CustomHits />
            </InstantSearch>
          </div>
        </div>
      </div>
      <div className="block pt-5">
        <LeadFormDialog lead={buildingLead} onHide={() => setBuildingLead(null)} />
        <Modal title="Add a new building" show={showNewBuilding} onHide={() => setShowNewBuilding(false)}>
          <AddBuildingForm />
        </Modal>
        <div className=" max-w-screen-xl mx-auto grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-4 gap-2 py-10">
          {(hits || []).map((hit: any, k: any) => (
            <React.Fragment key={k}>
              <HitsBlock  algoliaProps={{ hit }} showLead={setBuildingLead} />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div
        className="z-20 w-full max-w-screen-xl mx-auto relative p-6 md:p-16 mb-16 md:mb-32"
        style={{ background: '#F8F8F8' }}>
        <H2 className="pb-4 bg-transparent px-2 md:px-0 text-left w-full" style={{ maxWidth: '672px' }}>
          Want an expert to help with your search?
        </H2>
        <B1 className="text-gray-soft font-light mb-8" style={{ maxWidth: '672px' }}>
          Work with the Lighthouse team to find an apartment that matches all of your needs and offers cash back. Let’s
          find a good deal together.
        </B1>
        <div className="flex w-full md:content-start content-center md:justify-start justify-center">
          <ButtonCta href="/start" variant="primary" icon={RightArrowIcon} className="w-full justify-center md:w-auto">
            Get Started
          </ButtonCta>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Lookup;
