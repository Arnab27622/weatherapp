"use client";

import React from 'react';

interface ChatBotHeaderProps {
    isDark: boolean;
    onNewChat: () => void;
    onClose: () => void;
}

const ChatBotHeader: React.FC<ChatBotHeaderProps> = ({ isDark, onNewChat, onClose }) => {
    return (
        <div className={`p-3 flex justify-between items-center ${isDark
            ? 'bg-linear-to-r from-blue-700 to-indigo-800'
            : 'bg-linear-to-r from-blue-500 to-indigo-500'
            }`}>
            <div className="flex items-center gap-2">
                <div className={`rounded-full p-1 ${isDark ? 'bg-blue-500' : 'bg-blue-400'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base">Weather Assistant</h3>
                <button
                    onClick={onNewChat}
                    className="text-blue-200 hover:text-white transition-colors ml-2"
                    aria-label="Start new chat"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <button
                onClick={onClose}
                className="text-blue-200 hover:text-white transition-colors"
                aria-label="Close chat"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default ChatBotHeader;
