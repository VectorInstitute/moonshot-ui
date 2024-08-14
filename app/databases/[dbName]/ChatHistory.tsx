'use client';

import { useState } from 'react';

interface ChatMessage {
  id: number;
  model: string;
  connection_id: string;
  prompt: string;
  prepared_prompt: string;
  predicted_result: string;
  prompt_time: string;
}

export default function ChatHistory({ chatHistory }: { chatHistory: ChatMessage[] }) {
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);

  return (
    <div className="space-y-4 h-[calc(100vh-200px)] overflow-y-auto pr-4">
      {chatHistory.map((message) => (
        <div key={`${message.model}-${message.id}`} className="bg-white shadow-sm rounded-lg p-4 transition-all duration-200 hover:shadow-md">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-sm text-gray-600">Model: {message.model}</span>
            <span className="text-xs text-gray-400">{new Date(message.prompt_time).toLocaleString()}</span>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold text-sm text-gray-700 mb-1">Prompt:</h3>
            <p className="text-sm text-gray-600">{message.prompt}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-700 mb-1">Response:</h3>
            <p className={`text-sm text-gray-600 ${expandedMessage === message.id ? '' : 'line-clamp-3'}`}>
              {message.predicted_result}
            </p>
            {message.predicted_result.length > 150 && (
              <button
                onClick={() => setExpandedMessage(expandedMessage === message.id ? null : message.id)}
                className="text-xs text-blue-600 hover:underline mt-1"
              >
                {expandedMessage === message.id ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}