
import { useEffect, useContext } from 'react';
import { StoryProgressContext } from '../../contexts/StoryProgressContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

function Story03Conclusion() {
    const context = useContext(StoryProgressContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error('Story02Next must be used within a StoryProgressProvider');
    }

    const { setCurrentStep } = context;

    useEffect(() => {
        setCurrentStep(3);
    }, [setCurrentStep]);

    const handleBack = () => {
        navigate('/story/2');
    };

  return (
    <div className="p-4 max-w-md mx-auto">
    <section className="mb-8">
      <h2 className="text-md text-3xl mb-4">You <span className="font-bold">are</span> a mathematician.</h2>
      <p>The journey doesn't end here, if you don't want it to. Here are some resources used that you can keep exploring to answer some of those questions you still have.</p>
    </section>
    <section className="grid grid-cols-3 gap-4">
      <div className="col-span-2 p-4">This website was made with a React frontend and Flask backend. If that means little to you, that's ok. Explore the source code and see for yourself what it means.</div>
      <div className="p-4 flex items-center justify-center"><a href="https://github.com/jporcenaluk/marino-app" className="btn btn-primary w-full">Source Code!</a></div>
      <div className="col-span-2 p-4">Our World In Data heavily inspired the calculations for CO<sub>2</sub> emissions. They have a great report behind the calculations.</div>
      <div className="p-4 flex items-center justify-center"><a href="https://ourworldindata.org/travel-carbon-footprint" className="btn btn-primary w-full">Emissions Report!</a></div>
      <div className="col-span-2 p-4">Spread the word! Share this site with other students and help make it more accurate.</div>
      <div className="p-4 flex items-center justify-center">
        <button
          className="btn btn-primary w-full"
          onClick={() => {
            navigator.clipboard.writeText("https://marinomaths.com");
          }}
        >
          <FontAwesomeIcon icon={faLink} />
        </button>
      </div>
      {/* <div className="col-span-2 p-4">Want to know the story behind the maker(s) of this website and how it came to be? Here it is.</div>
      <div className="p-4">Right Column 3</div> */}
    </section>
    <div className="flex">
      <button className="btn btn-secondary mt-4 mr-2" onClick={handleBack}>
        Back
      </button>
    </div>
  </div>
  );
}

export default Story03Conclusion;