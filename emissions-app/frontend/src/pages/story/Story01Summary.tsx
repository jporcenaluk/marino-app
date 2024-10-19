import { useEffect, useContext } from 'react';
import { StoryProgressContext } from '../../contexts/StoryProgressContext';
import SummaryStats from '../../components/SummaryStats';
import beachBallImage from '../../assets/beach-ball-measure.png';
import { useNavigate } from 'react-router-dom';
import './Story01Summary.css';


function Story01Summary() {
  const context = useContext(StoryProgressContext);
  const navigate = useNavigate();
  const currentStep = 1

  if (!context) {
    throw new Error('Story01Summary must be used within a StoryProgressProvider');
  }

  const { setCurrentStep } = context;

  useEffect(() => {
    setCurrentStep(currentStep);
  }, [setCurrentStep]);

  const handleBack = () => {
    navigate('/');
  };

  const handleNext = () => {
    navigate(`/story/${currentStep + 1}`);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <section className="mb-10">
        <h2 className="text-md font-extrabold">Marino Students & Staff</h2>
        <p className="text-xs mb-2">Estimated Commuting Stats For Maths Week</p>
        <SummaryStats/>
      </section>
      <section className="mb-6">
        <h3 className="text-3xl mb-4">Maths is about <span className="font-bold">curiosity</span>.</h3>
        <p>What do you <span className="font-bold">notice</span>? What do you <span className="font-bold">wonder</span>? When given summary statistics like this, you might have all sorts of questions. For example, which is the most efficient form of transportation?</p>
      </section>
      <section className="mb-6">
        <h3 className="text-xl">Or, wait, how much CO2 <span className="font-bold">is</span> a kilogram?</h3>
        <span className="text-xs">(It's about as much as fits in a beach ball)</span>
        <div className="flex justify-end">
          <img src={beachBallImage} alt="Beach ball representing 1 kg of CO2" className="w-24 sm:w-32 md:w-48" />
        </div>
      </section>
      <p>
        If you're still curious, read more to start seeing maths in a new light.
      </p>
      {/* <div style={{ display: 'none' }}>{JSON.stringify(documents)}</div> */}

      <div className="flex justify-between">
        <button className="btn btn-secondary mt-4" onClick={handleBack}>
          Back
        </button>

        <button className="btn btn-primary mt-4" onClick={handleNext}>
          Dive Deeper
        </button>
      </div>
    </div>
  );
}

export default Story01Summary;