import React from 'react';
import ReactDOM from 'react-dom/client';
import LibretaNotas from './App.jsx';
import './index.css'; // <- Importante para aplicar Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LibretaNotas />
  </React.StrictMode>
);
