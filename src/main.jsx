
import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './Home.jsx';

function Root() {
  const [started, setStarted] = useState(false);
  return started ? <App /> : <Home onStart={() => setStarted(true)} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
