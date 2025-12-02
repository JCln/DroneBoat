import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { toast, ToastContainer } from "react-toastify";
import { GlobalErrorHandler } from './global-error-handler.tsx';

window.addEventListener('error', (event) => {
  toast.error(`error: ${event.message}`)
  event.preventDefault() // Prevent default error UI
})

createRoot(document.getElementById('root')!).render(
  <GlobalErrorHandler>
    <Suspense fallback={<div></div>}>
      <ToastContainer />
      <App />
    </Suspense>
  </GlobalErrorHandler>
)
