// src/Chatbot.js
import React, { useState, useEffect, useContext, useRef } from 'react';
import getGroqChatCompletion from './groqApi';
import PersonaContext from './context/PersonaContext';
import { IoSend } from "react-icons/io5";
import { AiOutlineExport } from "react-icons/ai";
import { LuImport } from "react-icons/lu";





function Chatbot() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { personality } = useContext(PersonaContext);
  const scrollRef = useRef(null);
  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {

    // console.log(process.env.REACT_APP_GROQ);

    e.preventDefault();
    const inputCurrent= inputValue;
    setInputValue('');
    setChatLog((prevChatLog) => [...prevChatLog, { role: 'user', content: inputCurrent }]);
    setIsLoading(true);
    const completion = await getGroqChatCompletion(inputCurrent, chatLog, personality);
    setChatLog((prevChatLog) => [...prevChatLog, { role: 'assistant', content: completion.choices[0].message.content }]);
    setResponse(completion.choices[0].message.content);
    setIsLoading(false);
    
  };

  useEffect(() => {
    setChatLog([]);
  }, [personality]);

  useEffect(() => {
    if (chatLog.length > 0) {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  })

  return (
    <div className='w-full bg-gray-900 flex justify-center'>
      <div className='flex w-full flex-col h-screen items-center'>
        <h1 className='text-3xl font-bold text-white p-4 flex flex-row justify-between w-[60%]'>
          <img src={personality.imageUrl} alt={personality.name} className='w-[95px] h-[120px] rounded-[10%] object-cover' />
          <div className='flex flex-col gap-4 text-white items-end'>{personality.name}
          <div className='gap-4 flex flex-row'>
          <button className='text-white'><LuImport className='bg-blue-500 w-[40px] h-[40px] p-2 rounded-[10%]' />
</button>
<button className='text-white'><AiOutlineExport className='bg-blue-500 w-[40px] h-[40px] p-2 rounded-[10%]' />
</button>
<button className='text-white'><AiOutlineExport className='bg-blue-500 w-[40px] h-[40px] p-2 rounded-[10%]' />
</button>
</div>
          </div></h1>
        <div className='flex flex-col flex-grow w-[100%] items-center p-4 overflow-y-auto'>
          <div className='flex flex-col space-y-4 w-[60%]'>
            {
              chatLog.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex ${message.role === 'user' ? 'bg-green-500' : 'bg-blue-500'} rounded-lg p-4 text-white max-w-[60%]`}>
                    {message.content}
                  </div>
                </div>
              ))
            }
            <div ref={scrollRef}></div>
          </div>

        </div>
        <form onSubmit={handleSubmit}
          className='flex flex-row w-[60%] justify-between place-items-center mb-4'
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            className='text-white border border-neutral-500/50 focus:outline-none bg-neutral-800/20 rounded p-2 flex flex-grow mr-1 my-2'
          />
          <button type="submit"
            className='bg-blue-500 rounded p-2 px-8 ml-1 my-2 flex flex-row justify-center items-center text-white gap-2 hover:bg-blue-600 duration-300'>Send <IoSend className='w-[20px] h-[20px]'/>
          </button>
        </form>
      </div>
      {/* <p>{response}</p> */}
    </div>
  );
}

export default Chatbot;