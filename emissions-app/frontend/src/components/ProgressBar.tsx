import { useContext } from 'react';
import { StoryProgressContext } from '../contexts/StoryProgressContext';

const ProgressBar = () => {
  const context = useContext(StoryProgressContext);

  if (!context) {
    // The ProgressBar is being used outside of the StoryProgressProvider
    return null;
  }

  const { currentStep, totalSteps } = context;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="p-4 bg-gray-100">
      <div className="w-full">
        <progress
          className="progress progress-primary w-full"
          value={progressPercentage}
          max="100"
        ></progress>
        <div className="text-xs text-center mt-2">{`${currentStep}/${totalSteps}`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
