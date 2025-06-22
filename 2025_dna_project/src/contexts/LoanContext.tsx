import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LoanRecord {
  id: number;
  bookId: number;
  title: string;
  author: string;
  cover: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'overdue' | 'reserved';
}

interface LoanContextType {
  loanRecords: LoanRecord[];
  addLoan: (loan: Omit<LoanRecord, 'id'>) => void;
  updateLoanStatus: (id: number, status: LoanRecord['status']) => void;
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

  // 연체 상태 자동 업데이트
  useEffect(() => {
    const checkOverdue = () => {
      const today = new Date();
      setLoanRecords(prevRecords =>
        prevRecords.map(record => {
          if (record.status === 'active' && new Date(record.endDate) < today) {
            return { ...record, status: 'overdue' };
          }
          return record;
        })
      );
    };

    // 매일 자정에 연체 상태 체크
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    // 초기 체크
    checkOverdue();

    // 매일 자정에 체크하도록 설정
    const timeout = setTimeout(() => {
      checkOverdue();
      // 이후 24시간마다 체크
      const interval = setInterval(checkOverdue, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  const addLoan = (loan: Omit<LoanRecord, 'id'>) => {
    setLoanRecords(prevRecords => {
      const newId = prevRecords.length > 0 
        ? Math.max(...prevRecords.map(r => r.id)) + 1 
        : 1;
      return [...prevRecords, { ...loan, id: newId }];
    });
  };

  const updateLoanStatus = (id: number, status: LoanRecord['status']) => {
    setLoanRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === id ? { ...record, status } : record
      )
    );
  };

  const cancelReservation = (id: number) => {
    setLoanRecords(prevRecords =>
      prevRecords.filter(record => record.id !== id)
    );
  };

  return (
    <LoanContext.Provider value={{ loanRecords, addLoan, updateLoanStatus, cancelReservation }}>
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