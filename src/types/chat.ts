import { RefObject } from "react";

export type Message = {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
};

export interface MessageBubbleProps {
    message: Message;
    isLoading?: boolean;
    isDark?: boolean;
}

export interface ChatBotMessagesProps {
    messages: Message[];
    isLoading: boolean;
    isDark: boolean;
    messagesEndRef: RefObject<HTMLDivElement | null>;
    onRetry: () => void;
}

export interface ChatBotInputProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    isLoading: boolean;
    isDark: boolean;
    onSendMessage: () => void;
    inputRef: RefObject<HTMLInputElement | null>;
}

export interface ChatBotHeaderProps {
    isDark: boolean;
    onNewChat: () => void;
    onClose: () => void;
}
