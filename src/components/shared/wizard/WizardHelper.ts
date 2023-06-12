/**
 *
 * @param {string} step  step id, currnt url segment
 * @param {string} path  route path
 * @param {object} fnSteps  array of steps
 * @returns {object} {currentStep, previousStep, nextStep}
 */
export const getAdjacentSteps = (
  step: string,
  fnStepKeys: string[] = [],
  path = 'user-onboarding'
): {
  currentStep: string;
  previousStep: string | null;
  nextStep: string | null;
} => {
  const currentStep = fnStepKeys.findIndex((s: string) => s === step);
  return {
    currentStep: `/${path}/${fnStepKeys[currentStep]}`,
    previousStep: currentStep > 0 ? `/${path}/${fnStepKeys[currentStep - 1]}` : null,
    nextStep: currentStep < fnStepKeys.length ? `/${path}/${fnStepKeys[currentStep + 1]}` : null,
  };
};

class WizardHelper {
  data: any = {};

  constructor(props: any) {
    this.data = props;
  }

  updateCompletedSteps = (step: any): void => {
    const { completedSteps, localData, storageItemIndex, disableStorage } = this.data;
    localData.current = { ...localData.current, ...this.getData() };
    completedSteps.current = localData.current.completedSteps || [];
    completedSteps.current = Array.from(new Set([...completedSteps.current, step]));
    const store = { ...localData.current, completedSteps: completedSteps.current };
    if (!disableStorage) {
      localStorage.setItem(storageItemIndex, JSON.stringify(store));
    }
    this.data = { ...this.data, ...store };
  };

  saveData = (data = {}): any => {
    const { storageItemIndex, formData, stepId, localData, setFormData, disableStorage } = this.data;
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const oldData = JSON.parse((window as any).localStorage.getItem(storageItemIndex));
        const obj = { ...oldData, ...formData, stepId };
        localData.current = { ...localData.current, ...obj, ...data };
        if (!disableStorage) {
          localStorage.setItem(storageItemIndex, JSON.stringify(localData.current));
        }
        this.data = { ...this.data, ...localData.current };
      }
    }, 0);
    setFormData({ ...formData, ...data });
    return localData.current;
  };

  getData = () => {
    const { storageItemIndex, localData, completedSteps, formData, stepId } = this.data;
    if (typeof window !== 'undefined') {
      const oldData = JSON.parse((window as any).localStorage.getItem(storageItemIndex));
      const obj = { completedSteps: completedSteps.current, ...oldData, ...formData, stepId };
      localData.current = { ...localData.current, ...obj };
    }
    return localData.current;
  };

  appendToCompletedSteps = (...tempSteps: string[]): any => {
    const { completedSteps, storageItemIndex, stepId } = this.data;
    if (typeof window !== 'undefined') {
      completedSteps.current = Array.from(new Set([...completedSteps.current, ...tempSteps, stepId])).filter((e) => e);
      const oldData = JSON.parse((window as any).localStorage.getItem(storageItemIndex));
      const store = { ...oldData, completedSteps: completedSteps.current };
      setTimeout(() => {
        localStorage.setItem(storageItemIndex, JSON.stringify(store));
        this.data = { ...this.data, ...store };
      }, 0);
    }
    return completedSteps.current;
  };

  setNextStep = (step: string, nextStepProps = {}): any => {
    const { stepKeys, steps, updateStep, router, setStepId, disableRouting, disableStorage } = this.data;
    const nextIndex = stepKeys[stepKeys.indexOf(step)];
    if (steps[nextIndex]) {
      setTimeout(() => {
        if (!disableRouting) router.push(nextIndex);
        updateStep(() => {
          const upNext = steps[nextIndex];
          if (!upNext) {
            return steps[stepKeys[0]];
          }
          return upNext;
        });
        setStepId(nextIndex);
      }, 100);
    }
  };

  checkRouterAction = () => {
    const {
      localData,
      stepKeys,
      router,
      debounce,
      sharedRoute,
      completedSteps,
      saveData,
      setIsLoading,
      disableRouting,
      steps,
      stepId,
    } = this.data;
    if (router && router?.hasOwnProperty('push')) {
      clearTimeout(debounce.current);
      debounce.current = setTimeout(() => {
        let { routerId } = this.data;
        const currentData = this.getData();
        localData.current = { ...localData.current, ...currentData };
        const reset = () => {
          if (!disableRouting) {
            router.replace(`/${sharedRoute}/${completedSteps.current.slice(-1)[0] || stepKeys[0]}`);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
          routerId = completedSteps.current.slice(-1)[0] || stepKeys[0];
        };
        if (!routerId) {
          if (Object.keys(router.query).includes('city')) {
            saveData({ city: router.query.city, ne: router.query.ne, sw: router.query.sw });
          }
          reset();
          setIsLoading(false);
        } else {
          let { previousStep }: any = getAdjacentSteps(routerId, stepKeys, sharedRoute);
          previousStep = previousStep?.replace(new RegExp(`/${sharedRoute}|/|\\/gim`), '').trim();
          const allSteps = Object.keys(steps);
          const currentStepIndex = allSteps.indexOf(stepId);
          const prevStepIndex = allSteps[currentStepIndex - 1];
          const currentStepComponent = steps[stepId];

          // callback for before render
          if (currentStepComponent?.beforeStepLoaded) {
            const stopExecution = currentStepComponent.beforeStepLoaded({
              allSteps,
              currentStepIndex,
              prevStepIndex,
              previousStep,
              reset,
              setIsLoading,
              currentData: localData.current,
            });
            if (stopExecution) {
              reset();
            }
          }
          // first step with no info
          if (!previousStep || !completedSteps.current) {
            setIsLoading(false);
          }
          // direct opening of wizard step not allowed unles previous are marked completed
          if (
            previousStep &&
            !completedSteps.current.includes(previousStep.replace('/', '')) &&
            completedSteps.current.slice(-1)[0] !== prevStepIndex
          ) {
            completedSteps.current = [];
            reset();
            setIsLoading(false);
          } else if (!currentStepComponent?.beforeStepLoaded) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        }
      }, 500);
    }
  };
}

export default WizardHelper;
