import { useEffect, useState, useContext } from 'react';
import { StoryProgressContext } from '../../contexts/StoryProgressContext';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RecordData {
  transport_mode: string;
  total_recorded_count: number;
  total_recorded_co2_kg: number;
  total_recorded_distance_km: number;
  avg_co2_kg_per_record: number;
  avg_distance_km_per_record: number;
  percent_of_total_recorded: number;
}

interface Document {
  transport_mode_summaries: RecordData[];
}

function Story02Questions() {
  const [documents, setDocuments] = useState<Document>();
  const [loading, setLoading] = useState(true);
  const context = useContext(StoryProgressContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('Story02Questions must be used within a StoryProgressProvider');
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

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch('/api/02-story-questions');
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

  // Example data for the stacked chart
  // Transform the transport_mode_summaries data for the stacked chart
  const data = documents?.transport_mode_summaries.map((record) => ({
    name: record.transport_mode,
    percentOfTotalRecorded: record.percent_of_total_recorded
  })) || [];
  const colors = ["#8884d8", "#82ca9d", "#aaa", "#ff7300", "#413ea0", "#ffbb28", "#ff8042", "#00c49f", "#0088fe", "#ff00ff"];

  const renderBars = (data: any) => {
    const keys = Object.keys(data[0]).filter(key => key !== 'name');
    return keys.map((key, index) => (
      <Bar key={key} dataKey={key} stackId="a" fill={colors[index % colors.length]} />
    ));
  };
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <section className="mb-10">
        <h3 className="text-3xl mb-4">Maths holds the <span className="font-bold">answers</span>.</h3>
        <h3 className="text-3xl mb-4">What are your <span className="font-bold">questions?</span></h3>
      </section>
      <ResponsiveContainer width="100%">
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          {renderBars(data)}
        </BarChart>
      </ResponsiveContainer>
      <div>{JSON.stringify(documents)}</div>
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

export default Story02Questions;