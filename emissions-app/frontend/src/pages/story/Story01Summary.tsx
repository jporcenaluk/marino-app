import { useEffect, useState, useContext } from 'react';
import { StoryProgressContext } from '../../contexts/StoryProgressContext';
import { useNavigate } from 'react-router-dom';
import './Story01Summary.css';

interface RecordData {
  avg_co2_kg_per_record: number;
  avg_co2_kg_per_record_per_distance_km: number;
  avg_distance_km_per_record: number;
  date?: string; // Optional because it's not in the weekly object
  estimated_total_co2_kg: number;
  estimated_total_distance_km: number;
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
    <div>
      <section>
        <h2>Marino Students & Staff</h2>
        <p>Estimated Commuting Emissions This Week</p>
        <div className="grid">
          <div className="p-4">
            <p>{Math.round(documents?.weekly.estimated_total_co2_kg ?? 0).toLocaleString()}</p>
            <p className="stat-label">kg CO2</p>
          </div>

          <div className="p-4">
            <p>{Math.round(documents?.weekly.estimated_total_distance_km ?? 0).toLocaleString()}</p>
            <p className="stat-label">km</p>
          </div>
        </div>
      </section>
      <section className="visualisation-content">
        <h3>Maths is about <span className="highlight">curiosity</span>.</h3>
        <p>What do you notice? What do you wonder? Maths is driven by curiosity about the world. When given summary statistics like this, you might have all sorts of questions. For example, which is the most efficient form of transportation?</p>
        <h4>Or, wait, how much CO2 <span className="highlight">is</span> a kilogram?</h4>
        <p>(It's about as much as fits in a beach ball)</p>
        <img src="/assets/beach_ball.png" alt="Beach ball representing 1 kg of CO2" className="beach-ball-image" />
      </section>
      <div style={{ display: 'none' }}>{JSON.stringify(documents)}</div>
      <div className="flex justify-end">
        <button className="btn btn-primary mt-4" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Story01Summary;