import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PopularBooks from './components/PopularBooks';
import MyLoans from './components/MyLoans';
import { LoanProvider } from './contexts/LoanContext';

const App: React.FC = () => {
  return (
    <LoanProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<PopularBooks />} />
        </Routes>
        <MyLoans />
      </div>
    </LoanProvider>
  );
};

export default App; 