"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ChatBotInputProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    isLoading: boolean;
    isDark: boolean;
    onSendMessage: () => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

const ChatBotInput: React.FC<ChatBotInputProps> = ({
    inputValue,
    setInputValue,
    isLoading,
    isDark,
    onSendMessage,
    inputRef
}) => {
    return (
        <div className={`p-2 border-t ${isDark
            ? 'bg-gray-800 border-gray-700'
            : 'bg-slate-100 border-slate-200'
            }`}>
            {inputValue.length > 250 && (
                <div className={`text-xs mb-1 text-right ${isDark ? 'text-red-400' : 'text-red-500'}`}>
                    {inputValue.length}/300 characters
                </div>
            )}

            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                    placeholder="Ask about the weather..."
                    className={`flex-1 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${isDark
                        ? 'bg-gray-700 text-white focus:ring-blue-500'
                        : 'bg-white text-slate-800 focus:ring-blue-400 shadow-sm'
                        }`}
                    disabled={isLoading}
                    maxLength={300}
                    aria-label="Type your message"
                />
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onSendMessage}
                    disabled={isLoading || !inputValue.trim() || inputValue.length > 300}
                    className={`p-2 rounded-lg flex items-center justify-center transition-all ${isLoading || !inputValue.trim() || inputValue.length > 300
                        ? isDark
                            ? 'bg-gray-600 text-gray-400'
                            : 'bg-slate-200 text-slate-400'
                        : isDark
                            ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90'
                            : 'bg-linear-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90'
                        }`}
                    aria-label={isLoading ? "Sending message" : "Send message"}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="flex space-x-1">
                                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-gray-300' : 'bg-slate-600'}`}></div>
                                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-gray-300' : 'bg-slate-600'}`} style={{ animationDelay: '0.2s' }}></div>
                                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-gray-300' : 'bg-slate-600'}`} style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default ChatBotInput;
