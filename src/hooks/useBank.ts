import { createContext, useContext } from 'react';

import { Bank } from '@models/index';

type BankCtxType = {
  bank?: Bank;
  setBank: (bank: Bank) => void;
};
export const BankContext = createContext<BankCtxType>({
  bank: undefined,
  setBank: () => {},
});

const useBank = () => useContext(BankContext);
export default useBank;
