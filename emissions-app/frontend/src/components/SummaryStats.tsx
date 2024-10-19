import { useState, useEffect } from 'react'

interface RecordData {
    total_recorded_count: number;
    date?: string; // Optional because it's not in the weekly object

    // averages per record
    avg_co2_kg_per_record: number;
    avg_co2_kg_per_record_per_distance_km: number;
    avg_distance_km_per_record: number;

    // estimates
    total_estimate_co2_kg: number;
    total_estimate_distance_km: number;

    // confidence intervals
    total_estimate_co2_kg_margin_of_error: number;
    total_estimate_co2_kg_lower_bound: number;
    total_estimate_co2_kg_upper_bound: number;
    total_estimate_distance_km_margin_of_error: number;
    total_estimate_distance_km_lower_bound: number;
    total_estimate_distance_km_upper_bound: number;
    confidence_level: number;

    // totals for all records
    total_recorded_co2_kg: number;
    total_recorded_distance_km: number;
}

interface Document {
    daily: RecordData[];
    weekly: Omit<RecordData, 'date'>; // weekly object doesn't contain a 'date'
}

interface SummaryStatsProps {
    fetchDocumentsOverride?: () => Promise<void>;
}

const SummaryStats = ({ fetchDocumentsOverride }: SummaryStatsProps) => {
    const [documents, setDocuments] = useState<Document>();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchDocuments = fetchDocumentsOverride || defaultFetchDocuments;

        async function defaultFetchDocuments() {
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
        <div className="flex justify-between">
            <div className="text-left">
                <p>co<sub>2</sub> emissions</p>
                <p className="text-4xl font-extrabold mb-2">{Math.round(documents?.weekly.total_estimate_co2_kg ?? 0).toLocaleString()} kg</p>
                <p className="text-xs"><a className="underline" href="https://www.nngroup.com/articles/confidence-interval/">{documents?.weekly.confidence_level ?? 0}% CI</a>, {Math.round(documents?.weekly.total_estimate_co2_kg_lower_bound ?? 0).toLocaleString()} - {Math.round(documents?.weekly.total_estimate_co2_kg_upper_bound ?? 0).toLocaleString()}</p>
            </div>

            <div className="text-right">
                <p>distance travelled</p>
                <p className="text-4xl font-extrabold mb-2">{Math.round(documents?.weekly.total_estimate_distance_km ?? 0).toLocaleString()} km</p>
                <p className="text-xs">{documents?.weekly.confidence_level ?? 0}% CI, {Math.round(documents?.weekly.total_estimate_distance_km_lower_bound ?? 0).toLocaleString()} - {Math.round(documents?.weekly.total_estimate_distance_km_upper_bound ?? 0).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default SummaryStats;