import React from 'react';
import './App.css';
import "leaflet/dist/leaflet.css";
import  { MapBubble }  from './MapBubble';

function App() {

  return (
    <div className="App">
      <MapBubble />
    </div>
  );
}

export default App;