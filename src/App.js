// src/App.js
import React from 'react';
import Chatbot from './Chatbot';
import Sidebar from './Sidebar';
import PersonaContextProvider from './context/PersonaContextProvider';
import SidebarContextProvider from './context/SidebarContextProvider';
import './App.css';
import DetailsContextProvider from './context/DetailsContextProvider';
import Detailsbar from './Detailsbar';
import { useRef } from 'react';

function App() {

 const onImportRef = useRef(null);
 const onExportRef = useRef(null);
 const onDeleteRef = useRef(null);


  return (
    <div className=''>
      <PersonaContextProvider>
      <DetailsContextProvider>
      <SidebarContextProvider>
      <Sidebar/>
      <Detailsbar
      onImport={onImportRef}
      onExport={onExportRef}
      onDelete={onDeleteRef}
      />
      <Chatbot
      onImport={onImportRef}
      onExport={onExportRef}
      onDelete={onDeleteRef}
      />
      </SidebarContextProvider>
      </DetailsContextProvider>
      </PersonaContextProvider>
    </div>
  );
}

export default App;