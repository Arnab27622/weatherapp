/**
 * AI ChatBot Component
 * An interactive weather assistant powered by Google Gemini.
 * Features smooth animations with Framer Motion, keyboard shortcuts (Ctrl+K, Esc),
 * and automatic scroll-to-bottom behavior.
 */

"use client";

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useChat } from '@/hooks/use-chat';
import ChatBotHeader from './ChatBotHeader';
import ChatBotMessages from './ChatBotMessages';
import ChatBotInput from './ChatBotInput';

/**
 * ChatBot component
 * Manages the UI state for the floating chat window and orchestrates sub-components.
 */
const ChatBot = () => {
    const {
        isOpen,
        setIsOpen,
        messages,
        inputValue,
        setInputValue,
        isLoading,
        handleSendMessage,
        handleNewChat,
        handleRetry,
    } = useChat();

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Improved scroll behavior
    useEffect(() => {
        if (messagesEndRef.current) {
            const container = messagesEndRef.current.parentElement;
            if (container) {
                const lastMessageIsUser = messages.length > 0 && messages[messages.length - 1].role === 'user';
                if (lastMessageIsUser || messages.length <= 1) {
                    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
                } else {
                    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
                    if (isAtBottom) {
                        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        }
    }, [messages, isOpen]);

    // Auto-focus logic
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
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, setIsOpen]);

    return (
        <div className="fixed bottom-4 right-4 z-9999">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col border ${isDark
                            ? 'bg-linear-to-br from-gray-800 to-gray-900 border-gray-700'
                            : 'bg-linear-to-br from-slate-50 to-slate-100 border-slate-200'
                            }`}
                        style={{ maxWidth: 'calc(100vw - 2rem)', maxHeight: 'calc(100vh - 4rem)' }}
                    >
                        <ChatBotHeader
                            isDark={isDark}
                            onNewChat={handleNewChat}
                            onClose={() => setIsOpen(false)}
                        />

                        <ChatBotMessages
                            messages={messages}
                            isLoading={isLoading}
                            isDark={isDark}
                            messagesEndRef={messagesEndRef}
                            onRetry={handleRetry}
                        />

                        <ChatBotInput
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            isLoading={isLoading}
                            isDark={isDark}
                            onSendMessage={handleSendMessage}
                            inputRef={inputRef}
                        />
                    </motion.div>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className={`rounded-full p-3 shadow-xl transition-all ${isDark
                            ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white'
                            : 'bg-linear-to-r from-blue-500 to-indigo-500 text-white'
                            }`}
                        aria-label="Open chat"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;
