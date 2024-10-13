
import { useEffect, useContext } from 'react';
import { StoryProgressContext } from '../../contexts/StoryProgressContext';
import { useNavigate } from 'react-router-dom';

function Story02Next() {
    const context = useContext(StoryProgressContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error('Story02Next must be used within a StoryProgressProvider');
    }

    const { setCurrentStep } = context;

    useEffect(() => {
        setCurrentStep(2);
    }, [setCurrentStep]);

    const handleNext = () => {
        navigate('/story/3');
    };

    const handleBack = () => {
        navigate('/story/1');
    };

  return (
    <div className="p-6">
      {/* Step two content */}
      <h2 className="text-2xl font-bold">Step Two</h2>
      <p>Content for step two.</p>
      <button className="btn btn-secondary mt-4 mr-2" onClick={handleBack}>
        Back
      </button>
      <button className="btn btn-primary mt-4" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default Story02Next;