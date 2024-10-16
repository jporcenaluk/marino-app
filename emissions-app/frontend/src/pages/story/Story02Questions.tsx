import { useEffect, useState, useContext } from 'react';
import { StoryProgressContext } from '../../contexts/StoryProgressContext';
import { useNavigate } from 'react-router-dom';
import bicycle from '../../assets/bicycle.png';
import broomstick from '../../assets/broomstick.png';
import './Story02Questions.css';
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
    LabelList
} from 'recharts';

interface RecordData {
    transport_mode: string;
    transport_mode_friendly: string;
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
    const currentStep = 2

    if (!context) {
        throw new Error('Story02Questions must be used within a StoryProgressProvider');
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

    const data = documents?.transport_mode_summaries.map((record) => ({
        name: record.transport_mode_friendly,
        value: record.percent_of_total_recorded * 100,
    }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#19FF19', '#1919FF'];

    // Conditional rendering after all Hooks
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!documents || !documents.transport_mode_summaries) {
        return <div>No data available</div>;
    }

    const formatLabel = (value: number) => `${value.toFixed(1)}%`;

    return (
        <div className="p-4 max-w-md mx-auto">
            <section className="mb-10">
                <h3 className="text-3xl mb-4">
                    Maths holds the <span className="font-bold">answers</span>.
                </h3>
                <h3 className="text-3xl">
                    What are your <span className="font-bold">questions?</span>
                </h3>
            </section>
            <div className="font-bold">What modes of transportation are people taking?</div>
            <div className="flex justify-center items-center h-full w-full">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="38%"
                            outerRadius="65%"
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data?.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>
                                </Cell>
                            ))}
                            <LabelList className="piechart-text" dataKey="value" position="inside" formatter={formatLabel} />
                            <LabelList dataKey="name" position="outside" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <section className="grid grid-cols-3 gap-4">
                <div className="col-span-1 p-4 flex items-center justify-center"><img src={broomstick} alt="Broomsticks are not often used to get to school, but sometimes, maybe" className="w-24 sm:w-32 md:w-48" /></div>
                <div className="col-span-2 p-4 flex items-center justify-center">Unless you’re riding a broomstick and going to Hogwarts, it’s unlikely you flew to school. But why not fly to school?</div>
                <div className="col-span-2 p-4 flex items-center justify-center">Maths is a tool that help us think critically and guide us to asking more insightful questions (which then can be explored with, you guessed it, maths).</div>
                <div className="col-span-1 p-4 flex items-center justify-center"><img src={bicycle} alt="Bicycles are more often used to get to schoole. But why?" className="w-24 sm:w-32 md:w-48" /></div>
            </section>


            {/* <div>{JSON.stringify(documents)}</div> */}
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

export default Story02Questions;
