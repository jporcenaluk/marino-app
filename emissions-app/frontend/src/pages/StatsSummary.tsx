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
  const [showModal, setShowModal] = useState(false);
  const [prevRecordedCount, setPrevRecordedCount] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch('/api/01-story-summary');
        const data: Document = await response.json();
        setDocuments(data);

        // check if total_recorded_count has changed
        if (prevRecordedCount !== null && data.weekly.total_recorded_count !== prevRecordedCount) {
          setShowModal(true);
          setCountdown(5);
          setTimeout(() => setShowModal(false), 5000);
        }
        setPrevRecordedCount(data.weekly.total_recorded_count);
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

  }, [prevRecordedCount]);

  useEffect(() => {
    let countdownInterval: number;
    if (showModal) {
      countdownInterval = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [showModal]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 mx-auto h-full">
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg text-gray-900 text-lg">
            <p>New response(s) recorded!</p>
            <p className="text-xs text-gray-600">{countdown}</p>
          </div>
        </div>
      )}

      <section className="mb-2 flex flex-col justify-between h-full">
        <div className="flex flex-col items-center mb-4">
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
        <div className="flex justify-between items-end w-full">
          <a href="https://marinomaths.com" className="self-end text-4xl">Visit MarinoMaths.com</a>
          <div className="text-center">
            <p className="mb-2">scan the QR code</p>
            <img src={qrCode} alt="QR Code" className="w-12 sm:w-18 md:w-32" />
          </div>
        </div>

      </section>
    </div>
  );
}

export default StatsSummary;