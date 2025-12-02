// components/GlobalErrorHandler.tsx
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ENNaming } from './constants/enums';


function isCriticalError(error: Error): boolean {
    return (
        ['TypeError', 'ReferenceError', 'RangeError', 'SyntaxError'].includes(error.name) ||
        error.message.toLowerCase().includes('undefined')
    );
}

const GlobalListeners = () => {
    useEffect(() => {
        let isErrorDisplayed = false;
        let errorQueue: Error[] = [];

        const showError = (error: Error) => {
            if (isCriticalError(error)) {
                if (!isErrorDisplayed) {
                    isErrorDisplayed = true;
                    toast.error(getErrorMessage(error), {
                        onClose: () => {
                            isErrorDisplayed = false;
                            // Show next error in queue if exists
                            const nextError = errorQueue.shift();
                            if (nextError) {
                                setTimeout(() => showError(nextError), 300);
                            }
                        }
                    });
                } else {
                    // Add to queue if an error is already being displayed
                    errorQueue.push(error);
                }
            }
        };

        const getErrorMessage = (error: Error): string => {
            // Customize error messages based on error type if needed
            if (error.name === 'TypeError') {
                return ENNaming.globalErrorUnExpected;
            }
            if (error.name === 'ReferenceError') {
                return ENNaming.globalErrorAsync;
            }
            return ENNaming.globalErrorUnExpected;
        };

        const handleError = (event: ErrorEvent) => {
            showError(event.error || new Error(event.message));
        };

        const handleRejection = (event: PromiseRejectionEvent) => {
            const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));

            if (error?.message?.includes?.('Loading chunk')) {
                // Show modal instead of crash
                window.dispatchEvent(new CustomEvent('chunkLoadError', { detail: error }));
                return; // Don't toast or show ugly error
            }
            showError(error);
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleRejection);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleRejection);
        };
    }, []);

    return null;
};
export function GlobalErrorHandler({ children }: { children: ReactNode }) {
    const [isChunkError, setIsChunkError] = useState(false);
    const handleRefresh = () => window.location.reload();

    useEffect(() => {
        const handleChunkError = () => setIsChunkError(true);
        window.addEventListener('chunkLoadError', handleChunkError);
        return () => {
            window.removeEventListener('chunkLoadError', handleChunkError);
        };
    }, []);

    return (
        <>
            <GlobalListeners />
            {isChunkError && (
                <div>Chunk Error</div>
            )}
            <ErrorBoundary
                FallbackComponent={({ error, resetErrorBoundary }: FallbackProps) => (
                    <>

                        <div>
                            Fallback Error
                        </div>
                    </>
                )}
                onError={(error) => {
                    console.error('Caught by GlobalErrorBoundary:', error);
                    toast.error(
                        <div className="">
                            <i className=''></i>
                            <span>Error: {error.message}</span>
                        </div>
                    );
                }}
            >
                {children}
            </ErrorBoundary>
        </>
    );
}
