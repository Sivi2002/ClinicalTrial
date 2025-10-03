import React from 'react';
import LocationChart from './components/LocationChart';
import DemographicsChart from './components/DemographicsChart';
import TrialsPerCityChart from './components/TrialsPerCityChart';

function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Clinical Trial Analytics Dashboard</h1>
      <p style={{ color: '#666' }}>Simple dashboard: locations, demographics and top cities.</p>
      <LocationChart />
      <hr style={{ margin: '24px 0' }}/>
      <DemographicsChart />
      <hr style={{ margin: '24px 0' }}/>
      <TrialsPerCityChart />
    </div>
  );
}

export default App;
