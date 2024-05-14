// src/Sidebar.js
import React from 'react';
import personalities from './personalities';
import { useState, useContext } from 'react';
import PersonaContext from './context/PersonaContext';
import { RiDeleteBin6Fill } from "react-icons/ri";

function Sidebar() {

    const {setPersonality} = useContext(PersonaContext);
    const [hover, setHover] = useState({state: false, i: null});
 return (
  

    <div className='w-[100px] h-screen absolute top-0 left-0 bg-[#00020f] flex flex-col items-center p-4 gap-6 justify-between '>
        <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
            
            <img src='https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg' alt="logo" className='w-full h-full object-contain' />
        </div>
        <div className='flex flex-col items-center gap-6'>
        {
            
            personalities.map((personality, index) => (
                <div key={index} className='relative'>
                <div className='rounded-[10%] w-[60px] h-[60px] bg-black overflow-hidden'>
                    <img 
                        src={personality.imageUrl} 
                        alt={personality.name} 
                        className='w-full h-full rounded-[10%] object-cover hover:scale-[1.2] transition-transform duration-300'
                        onClick={() => setPersonality(personality)}
                        onMouseEnter={() => setHover({state: true, i: index})}
                        onMouseLeave={() => setHover({state: false, i: index})}
                        // title={personality.name} 
                    />
                </div>
                {/* Tooltip */}
                <span className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-[#12174b9d] text-white px-2 py-1 rounded whitespace-nowrap opacity-0 transition-opacity duration-300 ${hover.state && hover.i === index ? 'opacity-100' : 'opacity-0'}`}>
                    {personality.name}
                </span>
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