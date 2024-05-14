// src/App.js
import React from 'react';
import Chatbot from './Chatbot';
import Sidebar from './Sidebar';
import PersonaContextProvider from './context/PersonaContextProvider';
import './App.css';

function App() {
  return (
    <div>
      <PersonaContextProvider>
      <Sidebar/>
      <Chatbot />
      </PersonaContextProvider>
    </div>
  );
}

export default App;