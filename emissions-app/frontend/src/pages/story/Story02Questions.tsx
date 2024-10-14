import { useEffect, useState, useContext } from 'react';
import { StoryProgressContext } from '../../contexts/StoryProgressContext';
import { useNavigate } from 'react-router-dom';
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
    LabelList
} from 'recharts';

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
    // Hook calls at the top level
    const [documents, setDocuments] = useState<Document>();
    const [loading, setLoading] = useState(true);
    const context = useContext(StoryProgressContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error('Story02Questions must be used within a StoryProgressProvider');
    }

    const { setCurrentStep } = context;

    const handleNext = () => {
        navigate('/story/3');
    };

    const handleBack = () => {
        navigate('/story/1');
    };

    // useEffect to set current step
    useEffect(() => {
        setCurrentStep(2);
    }, [setCurrentStep]);

    // useEffect to fetch documents
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

    // // Initialize transportModes safely
    // const transportModes = documents?.transport_mode_summaries?.map(
    //     (record) => record.transport_mode
    // ) || [];


    const data = documents?.transport_mode_summaries.map((record) => ({
        name: record.transport_mode,
        value: record.percent_of_total_recorded,
    }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#19FF19', '#1919FF'];

    // Conditional rendering after all Hooks
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!documents || !documents.transport_mode_summaries) {
        return <div>No data available</div>;
    }

    return (
        <div className="p-4 max-w-md mx-auto">
        <section className="mb-10">
            <h3 className="text-3xl mb-4">
            Maths holds the <span className="font-bold">answers</span>.
            </h3>
            <h3 className="text-3xl mb-4">
            What are your <span className="font-bold">questions?</span>
            </h3>
        </section>
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                data={data}
                cx={120}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                >
                {data?.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <LabelList dataKey="name" position="outside" />
                </Pie>
            </PieChart>
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
