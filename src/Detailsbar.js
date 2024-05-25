
import React from 'react';
import personalities from './personalities';
import { useState, useContext } from 'react';
import PersonaContext from './context/PersonaContext';
import { RiDeleteBin6Fill } from "react-icons/ri";
import DetailsContext from './context/DetailsContext';
import { AiOutlineExport } from "react-icons/ai";
import { LuImport } from "react-icons/lu";
import { MdOutlineDeleteForever } from "react-icons/md";
import SidebarContext from './context/SidebarContext';

function Detailsbar({onImport, onExport, onDelete}) {

    const {personality, setPersonality} = useContext(PersonaContext);
    const {setDetailsbar, detailsbar} = useContext(DetailsContext);
    const {setSidebar, sidebar} = useContext(SidebarContext);

    
    const handleDelete= onDelete.current;
    const handleExport= onExport.current;
    const handleImport= onImport.current;
    
 return (
  
 
    <div className={`bg-[#ffffff] w-screen h-screen z-50 fixed top-0 right-0 bg-[#00020f] bg-white bg-opacity-[1%] backdrop-blur-[40px] border-r-[1px] border-white border-opacity-[10%] flex flex-col items-center p-4 gap-6 justify-between transition-transform transform duration-300 overflow-hidden
    xl:hidden ${detailsbar ? 'translate-x-0' : 'translate-x-[100%]'} `}>
        
        <h1 className='text-white font-bold text-3xl absolute top-0 right-0 mr-6 mt-6 block xl:hidden'
        onClick={() => setDetailsbar(false)}
        >x</h1>

<div className='w-[100%] h-[100%] max-w-[500px] flex flex-col items-center justify-between p-16 flex'>
              <div className='flex flex-col justify-center items-center gap-16'>
            <img src={personality.imageUrl} alt={personality.name} className='w-[130px] h-[180px] rounded-[10%] object-cover block' />
            <div className='flex flex-col gap-4 items-center'>
            <h1 className='text-3xl font-bold text-white text-center'>{personality.name}</h1>
            <p className='text-white text-center'>{personality.description}</p>
            </div>
            </div>
            <div className='gap-4 flex flex-row bg-white bg-opacity-[20%] rounded-full p-2 border-[1px] border-white border-opacity-[10%]'>
              <button className='text-white'>
                <input type="file" onChange={handleImport} style={{ display: 'none' }} id="importFile" accept=".json" />
                <label htmlFor="importFile" className='text-white cursor-pointer'>
                  <LuImport className='bg-[#602BD2] w-[40px] h-[40px] p-2 rounded-full' /></label>
              </button>

              <button className='text-white '
                onClick= {handleExport}
              >
                <AiOutlineExport className='bg-[#3DD616] w-[40px] h-[40px] p-2 rounded-full' />
              </button>

              <button className='text-white'
                onClick= {handleDelete}
              >
                <MdOutlineDeleteForever
                  className='bg-[#C20649] hover:bg-red-700 duration-300 w-[40px] h-[40px] p-2 rounded-full' />
              </button>
            </div>
     

    
        
    </div>

      </div>
  
 )
}
export default Detailsbar;