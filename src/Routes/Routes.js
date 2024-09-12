import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import StartPage from '../components/Pages/StartPage/StartPage';
import AllSection from '../components/Pages/AllSection/AllSection'


const AppRoutes = () => {
    return (
      <Router>
        <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path='/sections' element={<AllSection />} />
          {/* <Route path="longread" element={<LongRead />} /> */}
        </Routes>
      </Router>
    );
  }

  export default AppRoutes;