import { useEffect } from 'react';
// import StartPage from './components/Pages/StartPage/StartPage';
import AllSection from './components/Pages/AllSection/AllSection';
import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LongRead from './components/Pages/LongRead/LongRead';

function App() {

  const tg = window.Telegram.WebApp;
  tg.isExpanded;
  tg.expand();
  tg.enableClosingConfirmation();

  useEffect( () => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route index element={<LongRead/>} />
        {/* <Route index element={<StartPage />}/> */}
        {/* <Route path={'sections'} element={<AllSection />}/> */}
      </Routes>
    </div>
  );
}

export default App;
