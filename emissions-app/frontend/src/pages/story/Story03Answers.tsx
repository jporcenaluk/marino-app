
import { useEffect, useContext } from 'react';
import { StoryProgressContext } from '../../contexts/StoryProgressContext';
import { useNavigate } from 'react-router-dom';
import people from '../../assets/people.png';
import ukIrelandTranslate from '../../assets/uk-ireland-translate.png';
import surveyTrueFalse from '../../assets/survey-true-false.png'

function Story03Answers() {
    const context = useContext(StoryProgressContext);
    const navigate = useNavigate();
    const currentStep = 3

    if (!context) {
        throw new Error('Story02Next must be used within a StoryProgressProvider');
    }

    const { setCurrentStep } = context;

    useEffect(() => {
        setCurrentStep(currentStep);
    }, [setCurrentStep]);

    const handleNext = () => {
        navigate(`/story/${currentStep + 1}`);
    };

    const handleBack = () => {
        navigate(`/story/${currentStep - 1}`);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <section className="mb-8">
                <h2 className="text-md text-3xl mb-4">Maths isn't just about the <span className="font-black">right</span> answers.</h2>
                <p>There is not always a straightforward answer to difficult questions in the real world.</p>
                <p>Here are some of the assumptions built-in to all of the previous charts and statistics.</p>
            </section>
            <section className="grid grid-cols-3 gap-4">
                <div className="col-span-1 p-4">
                    <img src={people} alt="How accurate is the estimation of the number of people who commute?" className="w-24 sm:w-32 md:w-48" />
                </div>
                <div className="col-span-2 p-4 flex items-center justify-center">
                    There are 1400 students and 100 staff at Marino, and 75% of them travel to school daily. How accurate is this?
                </div>
                <div className="col-span-2 p-4">
                    The people who take the survey are a representative sample of all Marino students and staff. How sure can we be?
                </div>
                <div className="col-span-1 p-4 flex items-center justify-center">
                    <img src={surveyTrueFalse} alt="Are surveys accurate?" className="w-24 sm:w-32 md:w-48" />
                </div>
                <div className="col-span-1 p-4">
                    <img src={ukIrelandTranslate} alt="Does data from London translate to Dublin?" className="w-24 sm:w-32 md:w-48" />
                </div>
                <div className="col-span-2 p-4 flex items-center justify-center">
                    The report about CO2 emissions that was used to calculate CO2 emissions per mode of transportation was based in London. How well does it apply to Dublin?
                </div>
            </section>
            <div className="flex justify-between">
                <button className="btn btn-secondary mt-4" onClick={handleBack}>
                    Back
                </button>
                <button className="btn btn-primary mt-4" onClick={handleNext}>
                    Keep Going
                </button>
            </div>
        </div>
    );
}

export default Story03Answers;