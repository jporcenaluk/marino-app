import { useEffect, useState, useContext } from 'react';
import { StoryProgressContext } from '../../contexts/StoryProgressContext';
import { useNavigate } from 'react-router-dom';
import './Story01Summary.css';

interface RecordData {
  avg_co2_kg_per_record: number;
  avg_co2_kg_per_record_per_distance_km: number;
  avg_distance_km_per_record: number;
  date?: string; // Optional because it's not in the weekly object
  total_estimate_co2_kg: number;
  total_estimate_distance_km: number;
  total_recorded_co2_kg: number;
  total_recorded_count: number;
  total_recorded_distance_km: number;
}

interface Document {
  daily: RecordData[];
  weekly: Omit<RecordData, 'date'>; // weekly object doesn't contain a 'date'
}

function Story01Summary() {
  const [documents, setDocuments] = useState<Document>();
  const [loading, setLoading] = useState(true);
  const context = useContext(StoryProgressContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('Story01Summary must be used within a StoryProgressProvider');
  }

  const { setCurrentStep } = context;

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  const handleNext = () => {
    navigate('/story/2');
  };

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch('/api/01-story-summary');
        const data: Document = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDocuments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <section className="mb-8">
        <h2 className="text-md font-bold">Marino Students & Staff</h2>
        <p className="text-xs mb-4">Estimated Commuting Emissions Stats For This Week</p>
        <div className="flex justify-between">
          <div className="text-left">
            <p className="text-3xl font-bold">{Math.round(documents?.weekly.total_estimate_co2_kg ?? 0).toLocaleString()} kg</p>
            <p className="stat-label">co<sub>2</sub> emissions</p>
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold">{Math.round(documents?.weekly.total_estimate_distance_km ?? 0).toLocaleString()} km</p>
            <p className="stat-label">distance travelled</p>
          </div>
        </div>
      </section>
      <section className="mb-6">
        <h3 className="text-3xl mb-4">Maths is about <span className="font-bold">curiosity</span>.</h3>
        <p>What do you <span className="font-bold">notice</span>? What do you <span className="font-bold">wonder</span>? Maths is driven by curiosity about the world. When given summary statistics like this, you might have all sorts of questions. For example, which is the most efficient form of transportation?</p>
      </section>
      <section className="mb-6">
        <h3 className="text-xl">Or, wait, how much CO2 <span className="font-bold">is</span> a kilogram?</h3>
        <span className="text-xs">(It's about as much as fits in a beach ball)</span>
        <div className="flex justify-end">
          <img src="/beach-ball-measure.png" alt="Beach ball representing 1 kg of CO2" className="w-24 sm:w-32 md:w-48" />
        </div>
      </section>
      <p>
        If you're still curious, read more to start seeing maths in a new light.
      </p>
      <div style={{ display: 'none' }}>{JSON.stringify(documents)}</div>
      <div className="flex justify-end">
        <button className="btn btn-primary mt-4" onClick={handleNext}>
          Dive Deeper
        </button>
      </div>
    </div>
  );
}

export default Story01Summary;