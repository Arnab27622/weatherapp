/**
 * Production-ready logging utility
 * Provides structured logging with different severity levels
 */

import { LogLevel, LogContext } from "@/types/logger";

class Logger {
    private isDevelopment = process.env.NODE_ENV === 'development';

    /**
     * Format log message with timestamp and context
     */
    private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
        const timestamp = new Date().toISOString();
        const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
        return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
    }

    /**
     * Log informational messages
     */
    info(message: string, context?: LogContext): void {
        if (this.isDevelopment) {
            console.info(this.formatMessage('info', message, context));
        }
        // In production, you could send to a logging service like Sentry, LogRocket, etc.
    }

    /**
     * Log warning messages
     */
    warn(message: string, context?: LogContext): void {
        console.warn(this.formatMessage('warn', message, context));
        // In production, send to monitoring service
    }

    /**
     * Log error messages
     */
    error(message: string, error?: Error | unknown, context?: LogContext): void {
        const errorContext = {
            ...context,
            error: error instanceof Error ? {
                message: error.message,
                stack: error.stack,
                name: error.name,
            } : error,
        };

        console.error(this.formatMessage('error', message, errorContext));

        // In production, send to error tracking service (Sentry, Rollbar, etc.)
        // Example: Sentry.captureException(error, { extra: context });
    }

    /**
     * Log debug messages (only in development)
     */
    debug(message: string, context?: LogContext): void {
        if (this.isDevelopment) {
            console.debug(this.formatMessage('debug', message, context));
        }
    }

    /**
     * Log API errors with request details
     */
    apiError(endpoint: string, error: Error | unknown, context?: LogContext): void {
        this.error(`API Error: ${endpoint}`, error, {
            ...context,
            endpoint,
            timestamp: new Date().toISOString(),
        });
    }
}

// Export singleton instance
export const logger = new Logger();
