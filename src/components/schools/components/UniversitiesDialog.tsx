import React, { useState, useEffect } from 'react';

import Modal from '@components/shared/Modal';
import { B3, B2 } from '@components/shared/Typography';
import { unAuthed } from '@utils/http';

interface Props {
  show?: boolean;
  onHide: () => void;
  selectedUni: string | null | undefined;
}

const UniversitiesDialog: React.FC<Props> = ({ show, onHide, selectedUni }: Props) => {
  const [schools, setSchools] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  useEffect(() => {
    fetchSchools();
  }, []);
  async function fetchSchools() {
    const request = await unAuthed.get(`/schools`);
    setInitialData(request.data?.Schools);
    setSchools(request.data?.Schools);
  }
  function onSearchUni(text: string) {
    setSearchKey(text);
    if (text === '') {
      setSchools(initialData);
    } else {
      const result = initialData.filter((elem: any) => {
        const e = elem.name;
        return e.toLowerCase().indexOf(text.toLowerCase()) !== -1;
      });
      setSchools(result);
    }
  }
  return (
    <Modal show={show} onHide={onHide} title="" className="universities-dialog">
      <div className="uni-list-content">
        <B3 className="px-4">Universities</B3>
        <div className="pl-4 pr-6 mt-6">
          <input
            className="border w-full rounded py-2 px-6 mx-2 text-gray-700 leading-tight focus:outline-none"
            id="search-unis"
            type="text"
            value={searchKey}
            onChange={(e) => {
              onSearchUni(e.target.value);
            }}
            placeholder="Search a university"
          />
        </div>
        <div className="uni-list-container mt-6">
          {schools.map((school: any) => {
            return (
              <a
                key={school?.name}
                href={`/schools${school?.urlRoute}`}
                className={`${
                  selectedUni && selectedUni === school.urlRoute ? 'university-row-active' : 'university-row'
                } py-3 px-6 flex items-center cursor-pointer rounded`}>
                <div style={{ width: 38 }}>{school?.logo !== '' && <img src={school?.logo} alt="logo" />}</div>
                <B2 weight="font-bold">{school.name}</B2>
              </a>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default UniversitiesDialog;
