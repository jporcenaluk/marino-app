import React, { createContext, useState, PropsWithChildren } from 'react';

interface StoryProgressContextProps {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const StoryProgressContext = createContext<StoryProgressContextProps | undefined>(
  undefined
);

export const StoryProgressProvider = (props: PropsWithChildren<StoryProgressContextProps>) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; // Total number of steps in the wizard

  return (
    <StoryProgressContext.Provider value={{ currentStep, totalSteps, setCurrentStep }}>
      {props.children}
    </StoryProgressContext.Provider>
  );
};
