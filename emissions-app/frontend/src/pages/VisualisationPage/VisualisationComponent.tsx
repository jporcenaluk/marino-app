import { useEffect, useState } from 'react';

function VisualisationComponent() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch('/api/visualisation');
        const data = await response.json();
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
      <h1>Visualisation</h1>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>{JSON.stringify(doc)}</li>
        ))}
      </ul>
    </div>
  );
}

export default VisualisationComponent;