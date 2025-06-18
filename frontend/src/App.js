import React from 'react';
import DisasterForm from './components/DisasterForm';
import RealTimeFeed from './components/RealTimeFeed';

function App() {
  return (
    <div>
      <h1>Disaster Response Dashboard</h1>
      <DisasterForm />
      <RealTimeFeed />
    </div>
  );
}

export default App;
