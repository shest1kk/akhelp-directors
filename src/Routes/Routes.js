import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import LongRead from '../components/Pages/LongRead/LongRead';
import StartPage from '../components/Pages/StartPage/StartPage';
import AllSection from '../components/Pages/AllSection/AllSection'
import JuneProduct from '../components/Pages/LongRead/Product/June/JuneProduct';
import JulyProduct from '../components/Pages/LongRead/Product/July/JulyProduct';
import AugustPromo from '../components/Pages/LongRead/Promo/August/AugustPromo';
import AugustPeople from '../components/Pages/LongRead/People/August/PeopleAugust';
import SeptemberPromo from '../components/Pages/LongRead/Promo/September/SeptemberPromo';

const AppRoutes = () => {
    return (
      <Router>
        <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path='/sections' element={<AllSection />} />
        <Route path='/product/june' element={<JuneProduct />} />
        <Route path='/product/july' element={<JulyProduct />} />
        <Route path='/promo/august' element={<AugustPromo />} />
        <Route path='/people/august' element={<AugustPeople />} />
        <Route path='/promo/september' element={<SeptemberPromo />} />
          {/* <Route path="longread" element={<LongRead />} /> */}
        </Routes>
      </Router>
    );
  }

  export default AppRoutes;