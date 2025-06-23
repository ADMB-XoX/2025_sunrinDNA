import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LoanRecord {
  id: number;
  bookId: number;
  title: string;
  author: string;
  cover: string;
  startDate: Date;
  endDate: Date;
  status: 'reserved';
}

interface LoanContextType {
  loanRecords: LoanRecord[];
  addLoan: (loan: Omit<LoanRecord, 'id'>) => void;
  cancelReservation: (id: number) => void;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

// localStorage에서 사용할 키
const LOAN_STORAGE_KEY = 'loanRecords';

export const LoanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loanRecords, setLoanRecords] = useState<LoanRecord[]>(() => {
    // localStorage에서 기존 데이터 불러오기
    const savedRecords = localStorage.getItem(LOAN_STORAGE_KEY);
    if (savedRecords) {
      const parsed = JSON.parse(savedRecords);
      // Date 문자열을 Date 객체로 변환
      return parsed.map((record: any) => ({
        ...record,
        startDate: new Date(record.startDate),
        endDate: new Date(record.endDate)
      }));
    }
    return [];
  });

  // 대출 기록이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(LOAN_STORAGE_KEY, JSON.stringify(loanRecords));
  }, [loanRecords]);

  const addLoan = (loan: Omit<LoanRecord, 'id'>) => {
    setLoanRecords(prevRecords => {
      const newId = prevRecords.length > 0 
        ? Math.max(...prevRecords.map(r => r.id)) + 1 
        : 1;
      return [...prevRecords, { ...loan, id: newId }];
    });
  };

  const cancelReservation = (id: number) => {
    setLoanRecords(prevRecords =>
      prevRecords.filter(record => record.id !== id)
    );
  };

  return (
    <LoanContext.Provider value={{ loanRecords, addLoan, cancelReservation }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
}; 