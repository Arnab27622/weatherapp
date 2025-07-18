"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { useGlobalContext } from '@/app/context/globalContext';
import MessageBubble from './MessageBubble';
import { kelvinToCelsius, unixToTime } from '@/app/utils/misc';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

type Message = {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
};

type ForecastData = {
    name?: string;
    main?: {
        temp?: number;
        feels_like?: number;
        humidity?: number;
        pressure?: number;
    };
    weather?: Array<{
        description?: string;
        icon?: string;
    }>;
    wind?: {
        speed?: number;
        deg?: number;
    };
    sys?: {
        sunrise?: number;
        sunset?: number;
    };
    dt?: number;
    timezone?: number;
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const context = useGlobalContext();
    const forecast = context?.forecast as ForecastData | undefined;

    // Load messages from localStorage
    useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            try {
                setMessages(JSON.parse(savedMessages));
            } catch (error) {
                console.error('Failed to load chat history', error);
            }
        }
    }, []);

    // Save messages to localStorage
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    // Improved scroll behavior
    useEffect(() => {
        if (messagesEndRef.current) {
            const container = messagesEndRef.current.parentElement;
            if (container) {
                const isAtBottom =
                    container.scrollHeight - container.scrollTop <= container.clientHeight + 100;

                if (isAtBottom || messages.length <= 1) {
                    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }, [messages, isOpen]);

    // Auto-focus with improved timing
    useEffect(() => {
        if (isOpen && inputRef.current) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 350);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading || inputValue.length > 300) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue.trim(),
            role: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const weatherContext = forecast?.name ? `
Current Weather in ${forecast.name}:
- Temperature: ${forecast.main?.temp ? kelvinToCelsius(forecast.main.temp) + '°C' : 'N/A'}
- Feels like: ${forecast.main?.feels_like ? kelvinToCelsius(forecast.main.feels_like) + '°C' : 'N/A'}
- Condition: ${forecast.weather?.[0]?.description || 'N/A'}
- Humidity: ${forecast.main?.humidity || 'N/A'}%
- Wind: ${forecast.wind?.speed || 'N/A'} m/s
- Pressure: ${forecast.main?.pressure || 'N/A'} hPa
${forecast.sys?.sunrise && forecast.timezone ? `- Sunrise: ${unixToTime(forecast.sys.sunrise, forecast.timezone)}` : ''}
${forecast.sys?.sunset && forecast.timezone ? `- Sunset: ${unixToTime(forecast.sys.sunset, forecast.timezone)}` : ''}
${forecast.dt && forecast.timezone ? `- Current Time: ${unixToTime(forecast.dt, forecast.timezone)}` : ''}
            ` : 'No weather data available';

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `You are a helpful weather assistant. 
            Format responses using markdown syntax:
            - Use **bold** for bold text
            - Use bullet points with • 
            - DO NOT use HTML tags
            Current weather data:\n${weatherContext}\n\nUser question: ${inputValue}`
                            }]
                        }]
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            let aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Sorry, I couldn't process your question. Could you try asking differently?";

            const aiMessage: Message = {
                id: `ai-${Date.now()}`,
                content: aiResponse,
                role: 'assistant',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                content: "I'm having trouble connecting right now. Would you like to try again?",
                role: 'assistant',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        localStorage.removeItem('chatMessages');
    };

    const handleRetry = useCallback(() => {
        const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
        if (lastUserMessage) {
            setInputValue(lastUserMessage.content);
            setTimeout(handleSendMessage, 100);
        }
    }, [messages, handleSendMessage]);

    return (
        <div className="fixed bottom-6 right-6 z-[1000]">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col border ${isDark
                            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
                            : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200'
                            }`}
                    >
                        <div className={`p-4 flex justify-between items-center ${isDark
                            ? 'bg-gradient-to-r from-blue-700 to-indigo-800'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                            }`}>
                            <div className="flex items-center gap-2">
                                <div className={`rounded-full p-1 ${isDark ? 'bg-blue-500' : 'bg-blue-400'
                                    }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-semibold text-lg">Weather Assistant</h3>
                                <button
                                    onClick={handleNewChat}
                                    className="text-blue-200 hover:text-white transition-colors ml-2"
                                    aria-label="Start new chat"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-blue-200 hover:text-white transition-colors"
                                aria-label="Close chat"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className={`flex-1 overflow-y-auto p-4 max-h-[50vh] ${isDark
                            ? 'bg-gradient-to-b from-gray-900 to-gray-900'
                            : 'bg-gradient-to-b from-slate-50 to-slate-50'
                            }`}>
                            {messages.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}
                                >
                                    <div className={`rounded-full p-4 inline-block mb-4 ${isDark ? 'bg-gray-800' : 'bg-slate-100'
                                        }`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 mx-auto ${isDark ? 'text-blue-400' : 'text-blue-500'
                                            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className={`mt-2 text-lg font-medium ${isDark ? 'text-gray-200' : 'text-slate-800'
                                        }`}>Hi! I'm your weather assistant</p>
                                    <p className={`mt-1 ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                                        Ask me anything about the weather!
                                    </p>
                                    <div className="mt-4 flex flex-col items-center">
                                        <div className={`text-xs ${isDark
                                            ? 'text-gray-600 bg-gray-800'
                                            : 'text-slate-500 bg-slate-100'
                                            } px-3 py-1.5 rounded-full`}>
                                            Try: "What should I wear today?"
                                        </div>
                                    </div>
                                    <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-slate-500'
                                        }`}>
                                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
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

                            {/* Retry button for errors */}
                            {messages.some(m => m.id.startsWith('error')) && (
                                <div className="flex justify-end mb-2">
                                    <button
                                        onClick={handleRetry}
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

                        <div className={`p-4 border-t ${isDark
                            ? 'bg-gray-800 border-gray-700'
                            : 'bg-slate-100 border-slate-200'
                            }`}>
                            {/* Character counter */}
                            {inputValue.length > 250 && (
                                <div className={`text-xs mb-1 text-right ${isDark ? 'text-red-400' : 'text-red-500'
                                    }`}>
                                    {inputValue.length}/300 characters
                                </div>
                            )}

                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask about the weather..."
                                    className={`flex-1 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all ${isDark
                                        ? 'bg-gray-700 text-white focus:ring-blue-500'
                                        : 'bg-white text-slate-800 focus:ring-blue-400 shadow-sm'
                                        }`}
                                    disabled={isLoading}
                                    maxLength={300}
                                    aria-label="Type your message"
                                />
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !inputValue.trim() || inputValue.length > 300}
                                    className={`p-3 rounded-xl flex items-center justify-center transition-all ${isLoading || !inputValue.trim() || inputValue.length > 300
                                        ? isDark
                                            ? 'bg-gray-600 text-gray-400'
                                            : 'bg-slate-200 text-slate-400'
                                        : isDark
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90'
                                            : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90'
                                        }`}
                                    aria-label={isLoading ? "Sending message" : "Send message"}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center space-x-1">
                                            <span className={`text-xs italic mr-1 ${isDark ? 'text-gray-300' : 'text-slate-600'
                                                }`}>Thinking</span>
                                            <div className="flex space-x-1">
                                                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-gray-300' : 'bg-slate-600'
                                                    }`}></div>
                                                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-gray-300' : 'bg-slate-600'
                                                    }`} style={{ animationDelay: '0.2s' }}></div>
                                                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-gray-300' : 'bg-slate-600'
                                                    }`} style={{ animationDelay: '0.4s' }}></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                        </svg>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className={`rounded-full p-4 shadow-xl transition-all ${isDark
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                            }`}
                        aria-label="Open chat"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;