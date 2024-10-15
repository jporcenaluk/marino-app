import { useEffect, useState } from 'react';
import qrCode from '../assets/qr-code.svg';

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

function StatsSummary() {
  const [documents, setDocuments] = useState<Document>();
  const [loading, setLoading] = useState(true);


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

    // Set up interval to fetch documents every 5 seconds
    const intervalId = setInterval(fetchDocuments, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);

  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 mx-auto h-full">
      <section className="mb-10 flex flex-col justify-between h-full">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold">Marino Students & Staff</h1>
          <p className="text-lg mb-2">Estimated Commuting Stats For Maths Week</p>
          <div className="flex h-full mt-10 mb-10">
              <div className="text-left flex-grow p-5">
                  <p className="text-6xl font-extrabold">{Math.round(documents?.weekly.total_estimate_co2_kg ?? 0).toLocaleString()} kg</p>
                  <p className="stat-label">co<sub>2</sub> emissions</p>
              </div>
          
              <div className="text-right flex-grow p-5">
                  <p className="text-6xl font-extrabold">{Math.round(documents?.weekly.total_estimate_distance_km ?? 0).toLocaleString()} km</p>
                  <p className="stat-label">distance travelled</p>
              </div>
          </div>
          <div className="flex max-w-3xl w-full text-left text-lg border-b-2">
            Recorded Stats
          </div>
          <div className="grid grid-cols-3 gap-4 w-full max-w-3xl p-4">
            <div className="col-span-1 text-center">{documents?.weekly.total_recorded_count.toLocaleString() || 0} responses recorded</div>
            <div className="col-span-1 text-center">{documents?.weekly.avg_co2_kg_per_record.toFixed(2).toLocaleString() || 0} kg CO<sub>2</sub> avg. per commute</div>
            <div className="col-span-1 text-center">{documents?.weekly.avg_distance_km_per_record.toFixed(2).toLocaleString() || 0} km avg. per commute</div>
          </div>
        </div>
        <div className="flex justify-end mt-auto">
          <div>
            <img src={qrCode} alt="QR Code" className="w-12 sm:w-18 md:w-32" />            
          </div>
        </div>

      </section>
    </div>
  );
}

export default StatsSummary;