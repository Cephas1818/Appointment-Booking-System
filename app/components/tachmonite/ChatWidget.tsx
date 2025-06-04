'use client';
import React, { useState } from 'react';
import axios from 'axios';

interface ChatWidgetProps {
  businessSlug: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ businessSlug }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; from: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = { text: input, from: 'user' } as const;
    setMessages((m) => [...m, userMsg]);
    setInput('');
    try {
      const res = await axios.post('/api/agents/respond', { businessSlug, message: input });
      setMessages((m) => [...m, { text: res.data.reply, from: 'bot' }]);
    } catch {
      setMessages((m) => [...m, { text: 'Error', from: 'bot' }]);
    }
  };

  return (
    <>
      <button
        className="fixed bottom-5 right-5 bg-yellow-400 text-black p-3 rounded-full shadow"
        onClick={() => setOpen(!open)}
      >
        Chat
      </button>
      {open && (
        <div className="fixed bottom-20 right-5 bg-neutral-900 rounded-xl w-72 h-96 p-3 flex flex-col shadow">
          <div className="flex-1 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm ${m.from === 'user' ? 'text-right' : 'text-left'}`}>{m.text}</div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              className="flex-1 rounded bg-neutral-800 text-white p-1 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="bg-yellow-400 text-black px-2 rounded" onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
