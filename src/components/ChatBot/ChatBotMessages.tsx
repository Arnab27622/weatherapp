"use client";

import React from 'react';
import { motion } from 'framer-motion';
import MessageBubble from './MessageBubble';
import { Message } from '@/hooks/use-chat';

interface ChatBotMessagesProps {
    messages: Message[];
    isLoading: boolean;
    isDark: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    onRetry: () => void;
}

const ChatBotMessages: React.FC<ChatBotMessagesProps> = ({
    messages,
    isLoading,
    isDark,
    messagesEndRef,
    onRetry
}) => {
    return (
        <div className={`flex-1 overflow-y-auto p-2 max-h-[50vh] sm:max-h-[40vh] ${isDark
            ? 'bg-linear-to-b from-gray-900 to-gray-900'
            : 'bg-linear-to-b from-slate-50 to-slate-50'
            }`}>
            {messages.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}
                >
                    <div className={`rounded-full p-3 inline-block mb-3 ${isDark ? 'bg-gray-800' : 'bg-slate-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 mx-auto ${isDark ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className={`mt-2 text-sm font-medium ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>Hi! I&apos;m your weather assistant</p>
                    <p className={`mt-1 text-xs ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                        Ask me anything about the weather!
                    </p>
                    <div className="mt-3 flex flex-col items-center">
                        <div className={`text-xs ${isDark
                            ? 'text-gray-600 bg-gray-800'
                            : 'text-slate-500 bg-slate-100'
                            } px-2 py-1 rounded-full`}>
                            Try: &quot;What should I wear today?&quot;
                        </div>
                    </div>
                </motion.div>
            ) : (
                messages.map(message => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                        isDark={isDark}
                    />
                ))
            )}

            {isLoading && (
                <MessageBubble
                    message={{
                        id: 'typing',
                        content: '',
                        role: 'assistant',
                        timestamp: new Date()
                    }}
                    isLoading={true}
                    isDark={isDark}
                />
            )}

            {messages.some(m => m.id.startsWith('err')) && (
                <div className="flex justify-end mb-2">
                    <button
                        onClick={onRetry}
                        className={`text-xs px-3 py-1 rounded-full ${isDark
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-500 text-white'
                            }`}
                    >
                        Try Again
                    </button>
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatBotMessages;
