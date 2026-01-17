'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 italic">Something went wrong!</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md">
                An unexpected error occurred. Please try again or refresh the page.
            </p>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    )
}
