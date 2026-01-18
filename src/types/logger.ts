export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogContext {
    [key: string]: unknown;
}
