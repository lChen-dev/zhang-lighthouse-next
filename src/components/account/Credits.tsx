/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import dateformat from 'dateformat';

import { numberWithCommas } from '@utils/format';
import { labelStatus } from '@utils/dashboard-helper';

export interface Props {
  homecredits: any;
}

export default function Credits({ homecredits }: Props) {
  return (
    <>
      <div className="bg-white py-5 mt-5 w-11/12 rounded-md shadow-md mx-auto">
        <h1 className="font-eina3 pl-5 leading-5 text-lg font-bold">
          Lighthouse Home Credits
        </h1>
        <div className="flex">
          <div className="w-10/12 pl-5 pt-2">
            <span className="font-eina3 text-sm">
              Home Credits are a cash rebate that you receive when you buy a
              home with Lighthouse as your agent. Lighthouse wants to keep
              saving you cash. Let’s start the conversation as you look to buy
              your house.
            </span>
          </div>
          <div className="w-2/12">
            <button
              type="button"
              className="btn btn-blue bg-indigo-500 hover:bg-indigo-600 text-white font-eina3 p-2 px-4 rounded">
              <b>Read</b>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white py-5 mt-5 w-11/12 rounded-md shadow-md mx-auto">
        <div className="flex">
          <div className="w-3/12 pl-5 pt-2">
            <b className="font-eina3">Your Value</b>
          </div>
          <div className="w-7/12 pl-5 pt-2">
            <span className="font-eina3 rounded-full bg-green-500 px-3 text-white text-left">
              $400
            </span>
          </div>
          <div className="w-2/12">
            <button
              type="button"
              className="btn btn-blue bg-indigo-500 hover:bg-indigo-600 text-white font-eina3 p-2 px-4 rounded">
              <b>Redeem</b>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white py-5 mt-5 w-11/12 rounded-md shadow-md mx-auto">
        <div className="flex">
          <div className="w-10/12 pl-5 pt-2">
            <b className="font-eina3">Your Home Credit</b>
          </div>
        </div>
        <table className="table-auto w-11/12 ml-5 mt-5">
          <tbody>
            {(homecredits || []).map((row: any) => (
              <tr className="border border-t-0 border-l-0 border-r-0 border-b-1 border-gray-300 ">
                <td className="w-5/12">
                  <b className="font-eina3">
                    {dateformat(row.createdAt, 'mmmm, yyyy')}
                  </b>
                </td>
                <td className="w-2/12">
                  <b className="font-eina3">${numberWithCommas(row.amount)}</b>
                </td>
                <td className="w-2/12 text-right">
                  <span
                    className={`${
                      labelStatus(row.status).clsName
                    } font-eina3 text-sm rounded-full px-4`}>
                    {labelStatus(row.status).text}
                  </span>
                </td>
              </tr>
            ))}
            {(homecredits || []).length === 0 && (
              <tr>
                <td className="w-full text-center">Nothing found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
