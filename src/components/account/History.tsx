/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-nested-ternary */
import dateFormat from 'dateformat';
import { labelStatus } from '@utils/dashboard-helper';

export interface Props {
  history: any;
}

export default function Credits({ history }: Props) {
  return (
    <>
      <div className="bg-white py-5 mt-5 w-11/12 rounded-md shadow-md mx-auto">
        <div className="flex">
          <div className="w-10/12 pl-5 pt-2">
            <b className="font-eina3">
              Apartments you have checked availibility for
            </b>
          </div>
        </div>
        <table className="table-auto w-11/12 ml-5 mt-5">
          <tbody>
            {(history || []).map((row: any) => (
              <tr className="border border-t-0 border-l-0 border-r-0 border-b-1 border-gray-300 ">
                <td className="w-5/12">
                  <b className="font-eina3">{dateFormat(row.createdAt, 'mmmm dS, yy')}</b>
                </td>
                <td className="w-5/12">
                  <b className="font-eina3">{row.building.property_name}</b>
                </td>
              </tr>
            ))}
            {(history || []).length === 0 && (
            <tr>
              <td className="w-full text-center">Nothing found, Lets make some history</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
