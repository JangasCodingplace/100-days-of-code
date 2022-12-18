import React from 'react';
import './App.css';
import { MyCanvas } from "./components/MyCanvas";

function App() {
  return (
    <div className="App">
      <MyCanvas imageUrl="/receipt.jpg" />
    </div>
  );
}

export default App;
