import React, { createContext, useContext } from 'react';

export type WizardContextType<D = any> = {
  wizardData: D;
  saveData: (data: Partial<D>) => void;
  goToStep: (stepName: string) => void;
  setLoading: (loading: boolean) => void;
};

const WizardContext = createContext<WizardContextType>({} as WizardContextType);
export default WizardContext;

export const useWizard = () => useContext(WizardContext);
