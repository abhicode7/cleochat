// src/groqApi.js
"use strict";

import { Stream } from "groq-sdk/lib/streaming.mjs";
import { useState } from "react";


const Groq = require("groq-sdk");
const groq = new Groq({
    dangerouslyAllowBrowser: true,
  apiKey: process.env.REACT_APP_GROQ

});
async function getGroqChatCompletion(inputValue, chatLog, personality) {

  const reverseChatLog = chatLog;
  const sendValue = inputValue ? inputValue : 'Continue...';


  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: personality.description
      },

      ...reverseChatLog,
      {
        role: "user",
        content: sendValue
      }

      
    ],
    model: "llama3-70b-8192",
    max_tokens: 1024,
  });
}

export default getGroqChatCompletion;