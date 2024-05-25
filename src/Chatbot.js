// src/Chatbot.js
import React, { useState, useEffect, useContext, useRef } from 'react';
import getGroqChatCompletion from './groqApi';
import PersonaContext from './context/PersonaContext';
import { IoSend } from "react-icons/io5";
import { AiOutlineExport } from "react-icons/ai";
import { LuImport } from "react-icons/lu";
import { MdOutlineDeleteForever } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdOptions } from "react-icons/io";

import SidebarContext from './context/SidebarContext';
import DetailsContext from './context/DetailsContext';





function Chatbot({ onImport, onExport, onDelete }) {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { personality } = useContext(PersonaContext);
  const scrollRef = useRef(null);
  const { sidebar, setSidebar } = useContext(SidebarContext);
  const { detailsbar, setDetailsbar } = useContext(DetailsContext);
  const inputRef = useRef(null);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const inputCurrent = inputValue;
    setInputValue('');
    if (inputCurrent) {
      setChatLog((prevChatLog) => [...prevChatLog, { role: 'user', content: inputCurrent }]);
    }
    setIsLoading(true);
    const completion = await getGroqChatCompletion(inputCurrent, chatLog, personality);
    setChatLog((prevChatLog) => [...prevChatLog, { role: 'assistant', content: completion.choices[0].message.content }]);
    setResponse(completion.choices[0].message.content);
    setIsLoading(false);

  };

  const handleDelete = () => {
    setChatLog([]);
    localStorage.removeItem(personality.name);
  }


  // Export chat log to a JSON file
  const exportChatLog = () => {
    const chatLogString = JSON.stringify(chatLog, null, 2);
    const blob = new Blob([chatLogString], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personality.name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  // Import chat log from a JSON file
  const importChatLog = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const importedChatLog = JSON.parse(event.target.result);
      setChatLog(importedChatLog);
    };
    reader.readAsText(file);
  };



  // Load chat log from local storage when component mounts
  useEffect(() => {

    setChatLog([]);
    const storedChatLog = localStorage.getItem(personality.name);
    if (storedChatLog) {
      setChatLog(JSON.parse(storedChatLog));
    }
    console.log(chatLog)
  }, [personality]);


  // Save chat log to local storage whenever it changes
  useEffect(() => {

    if (chatLog.length > 0) {
      localStorage.setItem(personality.name, JSON.stringify(chatLog));
    }
  }, [chatLog]);

  useEffect(() => {
    if (chatLog.length > 0) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog])


  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);




  onImport.current = importChatLog;
  onExport.current = exportChatLog;
  onDelete.current = handleDelete;

  return (
    <div className='w-full h-[100svh] flex justify-center items-center bg-cover bg-center z-[-2]' style={{ backgroundImage: "url(/bg-img.png)" }}>


      <div className='relative flex w-full flex-col h-[95svh] items-center z-[0] py-4'>
        <div className='absolute top-0 right-0 xl:w-[82.5%] w-[98%] h-[100%] z-[-1]'>
          <div className='relative flex flex-row gap-4 items-start xl:items-center justify-between xl:justify-end w-[100%] h-[100%] bg-white bg-opacity-[1%] backdrop-blur-[40px] z-[-1] border-[1px] border-white border-opacity-[10%] rounded-tl-[3%] rounded-bl-[3%] xl:p-0 p-0'>

            <div className='flex flex-row gap-4 items-center justify-between w-full xl:hidden p-2'>
              <button className='text-white xl:hidden block items-center p-1'
                onClick={() => setSidebar(true)}
              ><GiHamburgerMenu className='w-8 h-8' />
              </button>

              <div className='text-white xl:hidden block items-center p-1 flex flex-row gap-2'>
                <img src={personality.imageUrl} alt={personality.name} className='w-12 h-12 rounded-full object-cover' />
                <h1 className='text-xl font-bold'>{personality.name}</h1>
              </div>

              <button className='text-white xl:hidden block items-center p-1'
                onClick={() => setDetailsbar(true)}
              ><IoMdOptions className='w-8 h-8' />
              </button>
            </div>


            <div className='w-[2px] h-[95%] bg-white bg-opacity-[20%] xl:block hidden'>
            </div>
            <div className='w-[22%] h-[100%] py-6 flex flex-col items-start justify-between pr-8 hidden xl:flex'>
              <div className='flex flex-col gap-16'>
                <img src={personality.imageUrl} alt={personality.name} className='w-[160px] h-[220px] rounded-[10%] object-cover hidden md:block' />
                <div className='flex flex-col gap-4'>
                  <h1 className='text-3xl font-bold text-white'>{personality.name}</h1>
                  <p className='text-white'>{personality.description}</p>
                </div>
              </div>
              <div className='gap-4 flex flex-row bg-white bg-opacity-[20%] rounded-full p-2 border-[1px] border-white border-opacity-[10%]'>
                <button className='text-white'>
                  <input type="file" onChange={importChatLog} style={{ display: 'none' }} id="importFile" accept=".json" />
                  <label htmlFor="importFile" className='text-white cursor-pointer'>
                    <LuImport className='bg-[#602BD2] w-[40px] h-[40px] p-2 rounded-full' /></label>
                </button>

                <button className='text-white '
                  onClick={exportChatLog}
                >
                  <AiOutlineExport className='bg-[#3DD616] w-[40px] h-[40px] p-2 rounded-full' />
                </button>

                <button className='text-white'
                  onClick={handleDelete}
                >
                  <MdOutlineDeleteForever
                    className='bg-[#C20649] duration-300 w-[40px] h-[40px] p-2 rounded-full' />
                </button>
              </div>

            </div>
          </div></div>

        <div className='flex flex-col flex-grow w-[100%] items-center p-4 overflow-y-auto mt-14 mb-4 xl:mt-4'>
          <div className='flex flex-col space-y-4 xl:w-[60%] w-[90%]'>
            {
              chatLog.map((message, index) => (
                <div key={index} className={`flex overflow-hidden ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex ${message.role === 'user' ? 'bg-gradient-to-r from-[#B218CB] to-[#DF1EFF]' : 'bg-gradient-to-r from-[#CC5C6D] to-[#CC1175]'} rounded-lg p-4 text-white md:max-w-[70%] max-w-[95%] break-words`}>
                    {message.content}
                  </div>
                </div>
              ))
            }
            <div ref={scrollRef}></div>
          </div>

        </div>
        <form onSubmit={handleSubmit}
          className='flex flex-row xl:w-[60%] w-[90%] justify-between place-items-center'
        >
          <div className='flex flex-row relative w-full items-center '>
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              placeholder={isLoading ? 'Replying...' : `Message ${personality.name}`}
              disabled={isLoading}
              className='text-white border border-neutral-500/50 focus:outline-none bg-neutral-800/20 rounded p-2 px-8 flex flex-grow h-[60px] w-full rounded-full '
            />
            <button type="submit"
              disabled={isLoading}

              className='absolute right-0 bg-gradient-to-r from-[#A329EF] to-[#F50061] rounded xl:p-2 xl:px-4 xl:mr-3 mr-2 flex flex-row justify-center items-center text-white disabled:bg-none duration-300 disabled:bg-gray-600 xl:h-[40px] w-[45px] h-[45px] xl:w-[80px] rounded-full '><IoSend className='w-[20px] h-[20px]' />
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Chatbot;