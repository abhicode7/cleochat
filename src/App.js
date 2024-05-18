// src/App.js
import React from 'react';
import Chatbot from './Chatbot';
import Sidebar from './Sidebar';
import PersonaContextProvider from './context/PersonaContextProvider';
import SidebarContextProvider from './context/SidebarContextProvider';
import './App.css';

function App() {
  return (
    <div>
      <PersonaContextProvider>
      <SidebarContextProvider>
      <Sidebar/>
      <Chatbot />
      </SidebarContextProvider>
      </PersonaContextProvider>
    </div>
  );
}

export default App;