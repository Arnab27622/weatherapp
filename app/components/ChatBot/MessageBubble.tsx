import { format } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

type MessageBubbleProps = {
    message: {
        id: string;
        content: string;
        role: 'user' | 'assistant';
        timestamp: Date;
    };
    isLoading?: boolean;
    isDark?: boolean;
};

const MessageBubble = ({ message, isLoading = false, isDark = true }: MessageBubbleProps) => {
    const isUser = message.role === 'user';
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Enhanced formatting function
    const formatContent = (content: string) => {
        // Split into paragraphs while preserving line breaks within paragraphs
        const paragraphs = content.split(/\n\s*\n/);

        return paragraphs.map((paragraph, pIndex) => {
            // Skip empty paragraphs
            if (paragraph.trim() === '') return null;

            // Check for heading markers
            if (paragraph.startsWith('### ') || paragraph.startsWith('## ') || paragraph.startsWith('# ')) {
                const level = paragraph.startsWith('### ') ? 3 : paragraph.startsWith('## ') ? 2 : 1;
                const headingText = paragraph.replace(/^#{1,3}\s+/, '');
                return (
                    <div
                        key={`p-${pIndex}`}
                        className={`font-bold ${level === 1 ? 'text-base' : level === 2 ? 'text-sm' : 'text-sm'} mb-1 mt-2 ${isDark ? 'text-blue-300' : 'text-blue-600'
                            }`}
                    >
                        {headingText}
                    </div>
                );
            }

            // Process each line within the paragraph
            const lines = paragraph.split('\n');
            const formattedLines = lines.map((line, lineIndex) => {
                // Skip empty lines
                if (line.trim() === '') return null;

                // Check for list items
                if (line.match(/^[\*\-•]\s+/)) {
                    const listItem = line.replace(/^[\*\-•]\s+/, '');

                    // Process bold text within list items
                    if (listItem.includes('**')) {
                        const parts = listItem.split('**');
                        return (
                            <div key={`line-${lineIndex}`} className="flex items-start my-0.5">
                                <span className={`mr-1 mt-1 ${isDark ? 'text-blue-300' : 'text-blue-500'}`}>•</span>
                                <span className="text-sm">
                                    {parts.map((part, partIndex) => (
                                        partIndex % 2 === 1 ? (
                                            <strong key={`part-${partIndex}`} className={`font-semibold ${isDark ? 'text-blue-200' : 'text-blue-600'
                                                }`}>
                                                {part}
                                            </strong>
                                        ) : (
                                            <span key={`part-${partIndex}`}>{part}</span>
                                        )
                                    ))}
                                </span>
                            </div>
                        );
                    }

                    return (
                        <div key={`line-${lineIndex}`} className="flex items-start my-0.5">
                            <span className={`mr-1 mt-1 ${isDark ? 'text-blue-300' : 'text-blue-500'}`}>•</span>
                            <span className="text-sm">{listItem}</span>
                        </div>
                    );
                }

                // Check for bold text
                if (line.includes('**')) {
                    const parts = line.split('**');
                    return (
                        <div key={`line-${lineIndex}`} className="my-0.5 text-sm">
                            {parts.map((part, partIndex) => (
                                partIndex % 2 === 1 ? (
                                    <strong key={`part-${partIndex}`} className={`font-semibold ${isDark ? 'text-blue-200' : 'text-blue-600'
                                        }`}>
                                        {part}
                                    </strong>
                                ) : (
                                    <span key={`part-${partIndex}`}>{part}</span>
                                )
                            ))}
                        </div>
                    );
                }

                // Regular line
                return (
                    <div key={`line-${lineIndex}`} className="my-0.5 text-sm">
                        {line}
                    </div>
                );
            });

            return (
                <div key={`p-${pIndex}`} className="mb-1">
                    {formattedLines}
                </div>
            );
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-1.5`}
        >
            <div className={`max-w-[90%] rounded-xl px-3 py-2 relative ${isUser
                ? isDark
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none'
                : isDark
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 rounded-bl-none'
                    : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800 rounded-bl-none'
                } shadow-sm`}>

                {!isLoading && !isUser && (
                    <div className="absolute -left-1 top-0 w-2 h-2 overflow-hidden">
                        <div className={`absolute w-2 h-2 rotate-45 transform origin-bottom-left ${isDark ? 'bg-gray-700' : 'bg-slate-100'
                            }`}></div>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex items-center space-x-1 py-0.5">
                        <div className="flex space-x-1">
                            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-slate-500'}`}></div>
                            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-slate-500'}`} style={{ animationDelay: '0.2s' }}></div>
                            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-slate-500'}`} style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-sm leading-relaxed">
                            {formatContent(message.content)}
                        </div>
                        
                        {/* Bottom container for timestamp and copy button */}
                        <div className="flex items-center justify-between mt-1">
                            {/* Copy button for assistant messages - now at bottom left */}
                            {!isUser && (
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-slate-500 hover:text-slate-700'}`}
                                    aria-label={copied ? "Copied!" : "Copy message"}
                                >
                                    {copied ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                        </svg>
                                    )}
                                    <span className="text-[0.6rem]">{copied ? "Copied!" : "Copy"}</span>
                                </button>
                            )}
                            
                            {/* Timestamp aligned to the right */}
                            <p className={`text-[0.65rem] ${isUser
                                ? isDark ? 'text-blue-200' : 'text-blue-100'
                                : isDark ? 'text-gray-400' : 'text-slate-500'
                                }`}>
                                {format(message.timestamp, 'HH:mm')}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default MessageBubble;