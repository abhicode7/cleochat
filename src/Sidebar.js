// src/Sidebar.js
import React from 'react';
import personalities from './personalities';
import { useState, useContext } from 'react';
import PersonaContext from './context/PersonaContext';
import { RiDeleteBin6Fill } from "react-icons/ri";
import SidebarContext from './context/SidebarContext';
import { FaPeopleGroup } from "react-icons/fa6";

function Sidebar() {

    const { personality, setPersonality } = useContext(PersonaContext);
    const { setSidebar, sidebar } = useContext(SidebarContext);
    const [hover, setHover] = useState({ state: false, i: null });
    return (


        <div className={`w-[90%] xl:w-[100px] z-50 xl:h-screen h-[100svh] fixed top-0 left-0 bg-[#00020f] bg-white bg-opacity-[1%] backdrop-blur-[40px] border-r-[1px] border-white border-opacity-[10%] flex flex-col items-center p-4 gap-6 justify-between xl:translate-x-0 transition-transform duration-300
    ${sidebar ? 'translate-x-0' : 'translate-x-[-100%]'}
    
 `}>
            <div className='w-[80px] h-[120px] overflow-hidden'>

                <img src='/logo.png' alt="logo" className='w-full h-full object-contain' />
            </div>
            <h1 className='text-white font-bold text-3xl absolute top-0 right-0 mr-6 mt-6 block xl:hidden'
                onClick={() => setSidebar(false)}
            >x</h1>
            <div className='flex flex-col items-center xl:gap-6 gap-2 xl:w-auto w-[80%] mb-4 xl:mb-12'>
                {

                    personalities.map((personalityN, index) => (
                        <div key={index} className={`relative flex flex-row justify-start items-center w-full max-w-[300px]  bg-opacity-[20%] xl:p-0 p-1 rounded-full ${personality === personalityN ? 'bg-gradient-to-r from-[#CC5C6D] to-[#CC1175]' : 'bg-[#ffffff]'} xl:bg-none xl:bg-transparent`}
                            onClick={() => setPersonality(personalityN)}
                        >
                            <div className={`rounded-full xl:w-[70px] xl:h-[70px] w-[50px] h-[50px] bg-black overflow-hidden ${personality === personalityN ? 'xl:border-2 xl:border-[#FF7388]' : ''}`}>
                                <img
                                    src={personalityN.imageUrl}
                                    alt={personalityN.name}
                                    className='w-full h-full rounded-[10%] object-cover hover:scale-[1.2] transition-transform duration-300'
                                    // onClick={() => setPersonality(personality)}
                                    onMouseEnter={() => setHover({ state: true, i: index })}
                                    onMouseLeave={() => setHover({ state: false, i: index })}

                                />
                            </div>
                            {/* Tooltip */}
                            <span className={`absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-[#12174b9d] text-white px-2 py-1 rounded whitespace-nowrap opacity-0 transition-opacity duration-300 hidden xl:block opacity-0 ${hover.state && hover.i === index ? 'xl:opacity-100 ' : 'xl:opacity-0'}`}>
                                {personalityN.name}
                            </span>
                            <h1 className='text-white font-bold ml-2 uppercase xl:hidden block'>{personalityN.name}</h1>
                        </div>


                    ))


                }
            </div>
            
            <div className='w-[90px] h-[90px] xl:w-auto xl:h-auto overflow-hidden'>
            <img src='/coming-soon.png' alt="logo" className='xl:w-auto xl:h-auto w-full h-full object-contain' />
            </div>


        </div>
    )
}
export default Sidebar;