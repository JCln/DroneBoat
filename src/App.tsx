import './app.css';
import { lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ENRoutes } from './constants/ENRoutes';
const Home = lazy(() => import('./pages/home'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className='_app_main'>
          <Routes>
            <Route path={ENRoutes.Root} element={<Home />}></Route>
            <Route path={ENRoutes.NotFound} element={<NotFound />}></Route>
            <Route path='*' element={<NotFound />}></Route>

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
