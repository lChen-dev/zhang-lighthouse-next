import { useEffect, useState } from 'react';
import { NextApiRequest } from 'next';

// Utils
import { createHttpClient } from '@utils/http';
import { validateSession } from '@utils/auth';
import Navbar from '@components/shared/header/Header';
import { toGoogleBounds } from '../../models/Boundary';
import { sentryGetServerSideProps } from '../../utils/sentry';

// Components
import EmailClientModal from '../../components/slocator/EmailClientModal';
import FilterPanel from '../../components/slocator/FilterPanel';
import FloorPlanModal from '../../components/slocator/FloorPlanModal';
import PictureCarouselModal from '../../components/slocator/PictureCarouselModal';
import PropertyList from '../../components/slocator/PropertyList';

interface Props {
  properties: any;
  query: any;
}

// eslint-disable-next-line arrow-body-style
const SuperLocator = ({ properties, query }: Props) => {
  // Hardcoded default to Houston, TX
  const boundaryFromProps = toGoogleBounds({
    NE: query.ne || [-95.014496, 30.1107319],
    SW: query.sw || [-95.78808690000001, 29.52362],
  });
  const [boundary, setBoundary] = useState(boundaryFromProps);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [clientList, setClientList] = useState<any[]>([]);
  const [activeList, setActiveList] = useState('all-results');
  const [showPicsModal, setShowPicsModal] = useState(false);
  const [showFloorPlanModal, setShowFloorPlanModal] = useState(false);
  const [showEmailClientModal, setShowEmailClientModal] = useState(false);
  const [activeProperty, setActiveProperty] = useState({});
  const [hoveredId, setHoveredId] = useState<string>('');

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const noop = () => {};

  const updateClientList = (property: any) => {
    if (clientList.includes(property) === false) {
      clientList.push(property);
    } else {
      const index = clientList.indexOf(property);
      clientList.splice(index, 1);
    }

    const newClientList = clientList.slice();
    setClientList(newClientList);
  };

  const removeFromClientList = (property: any) => {
    const index = clientList.indexOf(property);
    const newClientList = clientList.splice(index, 1);
    setClientList(newClientList);
  };

  const addAll = () => {
    const newClientList = clientList.slice();
    filteredProperties.forEach((property: any) => {
      if (newClientList.includes(property) === false) {
        newClientList.push(property);
      }
    });
    setClientList(newClientList);
  };

  const openPicsModal = (property: any) => {
    setActiveProperty(property);
    setShowPicsModal(true);
  };

  const openFloorPlanModal = (property: any) => {
    setActiveProperty(property);
    setShowFloorPlanModal(true);
  };

  const openEmailClientModal = () => {
    setShowEmailClientModal(true);
  };

  return (
    <>
      {showPicsModal && <PictureCarouselModal setShowPicsModal={setShowPicsModal} activeProperty={activeProperty} />}
      {showFloorPlanModal && (
        <FloorPlanModal setShowFloorPlanModal={setShowFloorPlanModal} activeProperty={activeProperty} />
      )}
      {showEmailClientModal && (
        <EmailClientModal setShowEmailClientModal={setShowEmailClientModal} clientList={clientList} />
      )}
      <div className="bg-gray-800 pb-32">
        <Navbar />
      </div>
      <main className="-mt-32">
        <div className="w-full mx-auto pb-12 sm:px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow sm:px-5 sm:py-6 sm:px-6 my-4">
            <div className="rounded-lg h-96">
              <div className="bg-white overflow-hidden sm:rounded-md">
                <div className="flex flex-col">
                  <FilterPanel
                    query={query}
                    boundary={boundary}
                    setBoundary={setBoundary}
                    openEmailClientModal={openEmailClientModal}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow sm:px-5 sm:py-6 sm:px-6">
            <div className="rounded-lg h-96">
              <div className="bg-white overflow-hidden sm:rounded-md">
                <div className="flex flex-col">
                  <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="w-full align-middle flex min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200 grid-cols-2">
                      <div className="w-7/12" />
                      <div className="h-screen w-5/12 overflow-y-scroll p-2">
                        <div className="ml-2 mb-2 space-x-2">
                          <button
                            onClick={() => {
                              setActiveList('all-results');
                            }}
                            type="button"
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 bottom-0 rounded">
                            All Results
                          </button>
                          <button
                            onClick={() => {
                              setActiveList('client-list');
                            }}
                            type="button"
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 bottom-0 rounded">
                            Client List
                          </button>
                        </div>
                        <div className="ml-4 mb-8">
                          <button type="button" onClick={addAll}>
                            + Add all
                          </button>
                        </div>
                        {activeList === 'all-results' ? (
                          <PropertyList
                            buildings={filteredProperties}
                            onHover={(property: any) => {
                              if (property?.id) {
                                setHoveredId(property.id);
                              } else {
                                setHoveredId('');
                              }
                            }}
                            openPicsModal={openPicsModal}
                            openFloorPlanModal={openFloorPlanModal}
                            updateClientList={updateClientList}
                            clientList={clientList}
                          />
                        ) : (
                          <PropertyList
                            buildings={clientList}
                            onHover={(property: any) => {
                              if (property?.id) {
                                setHoveredId(property.id);
                              } else {
                                setHoveredId('');
                              }
                            }}
                            openPicsModal={openPicsModal}
                            openFloorPlanModal={openFloorPlanModal}
                            removeFromClientList={removeFromClientList}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = sentryGetServerSideProps(async ({ query, req, res }: any) => {
  try {
    const userId = await validateSession(req as NextApiRequest);
    if (userId) {
      const client = createHttpClient(req.headers.cookie);
      const { data } = await client.request({
        url: `http://${process.env.VERCEL_URL}/api/properties`,
        params: query,
        method: 'GET',
      });
      return { props: { userId, properties: data, query } };
    }
  } catch (e) {
    // fall through
  }
  return {
    redirect: {
      destination: `/?post_login_url=/slocator`,
      permanent: false,
    },
  };
});

export default SuperLocator;
