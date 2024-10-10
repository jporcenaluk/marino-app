import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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

  const processDataForChart = (data) => {
    const groupedData = {};
    data.forEach(({ date, co2_emissions_kg, transport_mode, transport_mode_friendly }) => {
      const day = new Date(date).toDateString();
      if (!groupedData[day]) {
        groupedData[day] = { day };
      }
      if (!groupedData[day][transport_mode_friendly]) {
        groupedData[day][transport_mode_friendly] = 0;
      }
      groupedData[day][transport_mode_friendly] += co2_emissions_kg;
    });
  
    return Object.values(groupedData);
  };

  const processedData = processDataForChart(documents);

  // Extract transport modes dynamically
  const transportModes = new Set();
  processedData.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== 'day') {
        transportModes.add(key);
      }
    });
  });

  // Function to assign colors to bars
  const getColor = (index) => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#d88884'];
    return colors[index % colors.length];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Visualisation</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={processedData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {[...transportModes].map((mode, index) => (
            <Bar key={mode} dataKey={mode} stackId="a" fill={getColor(index)} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      {/* For debugging purposes */}
      {/* <ul>
        {documents.map((doc, index) => (
          <li key={index}>{JSON.stringify(doc)}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default VisualisationComponent;