/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import dateFormat from 'dateformat';

export default function Credits(props) {
  const { searches } = props;
  return (
    <>
      <div className="bg-white py-5 mt-5 w-11/12 rounded-md shadow-md mx-auto">
        <div className="flex">
          <div className="w-10/12 pl-5 pt-0">
            <b className="font-eina3">
              My Searches
            </b>
          </div>
        </div>
        <table className="table-auto w-11/12 ml-5 mt-5">
          <thead>
            <tr className="text-left">
              <th>Location</th>
              <th>Beds</th>
              <th>Max Price</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {(searches || []).map((row) => (
              <tr className="border border-t-0 border-l-0 border-r-0 border-b-1 border-gray-300 ">
                <td className="w-4/12">
                  <b className="font-eina3 font-xs">{row.location}</b>
                </td>
                <td>{row.bedrooms.join(', ')}</td>
                <td>{row.maxPrice}</td>
                <td>
                  <b className="font-eina3">{dateFormat(row.createdAt, 'm/dd/yyyy')}</b>
                </td>
                <td>
                  <a href={`/search/${row._id}`}>View</a>
                </td>
              </tr>
            ))}
            {(searches || []).length === 0 && (
              <tr>
                <td className="w-full text-center">You have not made any search yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}