// src/Sidebar.js
import React from 'react';
import personalities from './personalities';
import { useState, useContext } from 'react';
import PersonaContext from './context/PersonaContext';
import { RiDeleteBin6Fill } from "react-icons/ri";
import SidebarContext from './context/SidebarContext';

function Sidebar() {

    const {setPersonality} = useContext(PersonaContext);
    const {setSidebar, sidebar} = useContext(SidebarContext);
    const [hover, setHover] = useState({state: false, i: null});
 return (
  

    <div className={`w-[90vw] md:w-[100px] z-50 md:h-screen h-[100vh] absolute top-0 left-0 bg-[#00020f] flex flex-col items-center p-4 gap-6 justify-between md:translate-x-0 transition-transform duration-300
    ${sidebar ? 'translate-x-0' : 'translate-x-[-100%]'}
    
 `}>
        <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
            
            <img src='https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg' alt="logo" className='w-full h-full object-contain' />
        </div>
        <h1 className='text-white font-bold text-3xl absolute top-0 right-0 mr-6 mt-6'
        onClick={() => setSidebar(false)}
        >x</h1>
        <div className='flex flex-col items-center gap-6 md:w-auto w-[80%]'>
        {
            
            personalities.map((personality, index) => (
                <div key={index} className='relative flex flex-row justify-start items-center w-full bg-[#12145c] p-2 rounded md:bg-transparent '
                onClick={() => setPersonality(personality)}
                >
                <div className='rounded-[10%] w-[60px] h-[60px] bg-black overflow-hidden'>
                    <img 
                        src={personality.imageUrl} 
                        alt={personality.name} 
                        className='w-full h-full rounded-[10%] object-cover hover:scale-[1.2] transition-transform duration-300'
                        // onClick={() => setPersonality(personality)}
                        onMouseEnter={() => setHover({state: true, i: index})}
                        onMouseLeave={() => setHover({state: false, i: index})}
                        
                    />
                </div>
                {/* Tooltip */}
                <span className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-[#12174b9d] text-white px-2 py-1 rounded whitespace-nowrap opacity-0 transition-opacity duration-300 hidden md:block opacity-0 ${hover.state && hover.i === index ? 'md:opacity-100 ' : 'md:opacity-0'}`}>
                    {personality.name}
                </span>
                <h1 className='text-white font-bold ml-2 uppercase md:hidden block'>{personality.name}</h1>
            </div>

            
            ))

            
        }
        </div>

        <div className='w-[50px] h-[50px] bg-red-500 rounded-[10%] flex justify-center items-center hover:bg-white  transition duration-300 text-white hover:text-red-500'>
        <RiDeleteBin6Fill className='w-[30px] h-[30px] ' />
        </div>
        
        
    </div>
 )
}
export default Sidebar;