// src/Chatbot.js
import React, { useState, useEffect, useContext, useRef } from 'react';
import getGroqChatCompletion from './groqApi';
import PersonaContext from './context/PersonaContext';
import { IoSend } from "react-icons/io5";
import { AiOutlineExport } from "react-icons/ai";
import { LuImport } from "react-icons/lu";
import { MdOutlineDeleteForever } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import SidebarContext from './context/SidebarContext';





function Chatbot() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { personality } = useContext(PersonaContext);
  const scrollRef = useRef(null);
  const { sidebar, setSidebar } = useContext(SidebarContext);


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
  }, [personality]);


  // Save chat log to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(personality.name, JSON.stringify(chatLog));
  }, [chatLog]);

  useEffect(() => {
    if (chatLog.length > 0) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog])

  return (
    <div className='w-full bg-gray-900 flex justify-center'>
      <div className='flex w-full flex-col h-screen items-center'>
        <h1 className='text-3xl font-bold text-white p-4 flex flex-row justify-between items-start md:w-[60%] w-[90%]'>
        <button className='text-white md:hidden block items-center p-1'
                onClick={() => setSidebar(true)}
              ><GiHamburgerMenu />
              </button>
          <img src={personality.imageUrl} alt={personality.name} className='w-[50px] h-[50px] md:w-[95px] md:h-[120px] rounded-[10%] object-cover hidden md:block' />
          <div className='flex flex-col gap-4 text-white items-end'><div className='flex flex-row gap-4 items-center'>{personality.name}<img src={personality.imageUrl} alt={personality.name} className='w-[50px] h-[50px] rounded-[10%] object-cover block md:hidden' /></div>
            <div className='gap-4 flex flex-row'>
              <button className='text-white'>
                <input type="file" onChange={importChatLog} style={{ display: 'none' }} id="importFile" accept=".json" />
                <label htmlFor="importFile" className='text-white cursor-pointer'>
                  <LuImport className='bg-blue-500 w-[40px] h-[40px] p-2 rounded-[10%]' /></label>
              </button>

              <button className='text-white '
                onClick={exportChatLog}
              >
              <AiOutlineExport className='bg-green-500 w-[40px] h-[40px] p-2 rounded-[10%]' />
              </button>
              
              <button className='text-white'
                onClick={handleDelete}
              >
                <MdOutlineDeleteForever
                  className='bg-red-500 hover:bg-red-700 duration-300 w-[40px] h-[40px] p-2 rounded-[10%]' />
              </button>
            </div>
          </div></h1>
        <div className='flex flex-col flex-grow w-[100%] items-center p-4 overflow-y-auto'>
          <div className='flex flex-col space-y-4 md:w-[60%] w-[90%]'>
            {
              chatLog.map((message, index) => (
                <div key={index} className={`flex overflow-hidden ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex ${message.role === 'user' ? 'bg-green-500' : 'bg-blue-500'} rounded-lg p-4 text-white md:max-w-[70%] max-w-[95%] break-words`}>
                    {message.content}
                  </div>
                </div>
              ))
            }
            <div ref={scrollRef}></div>
          </div>

        </div>
        <form onSubmit={handleSubmit}
          className='flex flex-row md:w-[60%] w-[90%] justify-between place-items-center mb-4'
        >
          <div className='flex flex-row relative w-full items-center '>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={isLoading ? 'Replying...' : `Message ${personality.name}`}
              disabled={isLoading}
              className='text-white border border-neutral-500/50 focus:outline-none bg-neutral-800/20 rounded p-2 px-4 flex flex-grow mr-1 my-2 h-[50px] w-full'
            />
            <button type="submit"
              disabled={isLoading}
              className='absolute right-0 bg-blue-500 rounded p-2 px-4 mr-2 flex flex-row justify-center items-center text-white hover:bg-blue-600 duration-300 disabled:bg-gray-800 h-[40px]'><IoSend className='w-[20px] h-[20px]' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;