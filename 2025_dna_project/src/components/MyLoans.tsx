import React from 'react';
import { useLoan, LoanRecord } from '../contexts/LoanContext';
import './MyLoans.css';

const MyLoans: React.FC = () => {
  const { loanRecords, cancelReservation } = useLoan();

  // 예약된 도서만 필터링
  const reservedBooks = loanRecords.filter(record => record.status === 'reserved');

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDaysUntilStart = (startDate: Date): number => {
    const today = new Date();
    const diffTime = startDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleCancelReservation = (id: number) => {
    if (window.confirm('예약을 취소하시겠습니까?')) {
      cancelReservation(id);
    }
  };

  return (
    <div className="my-loans">
      <h1 className="section-title">대출 예약 현황</h1>
      
      <div className="loan-status-summary">
        <div className="status-card reserved">
          <h3>전체 예약</h3>
          <p>{reservedBooks.length}권</p>
        </div>
      </div>

      {reservedBooks.length === 0 ? (
        <div className="no-reservations">
          <p>예약된 도서가 없습니다.</p>
        </div>
      ) : (
        <div className="loan-records">
          {reservedBooks.map(record => (
            <div key={record.id} className="loan-record-card">
              <img src={record.cover} alt={record.title} className="book-cover" />
              <div className="loan-info">
                <h3 className="book-title">{record.title}</h3>
                <p className="book-author">{record.author}</p>
                <div className="loan-dates">
                  <p>대출 예정일: {formatDate(record.startDate)}</p>
                  <p>반납 예정일: {formatDate(record.endDate)}</p>
                  <p className="days-left">
                    대출까지: {calculateDaysUntilStart(record.startDate)}일
                  </p>
                </div>
                <div className="loan-actions">
                  <button 
                    className="cancel-button"
                    onClick={() => handleCancelReservation(record.id)}
                  >
                    예약 취소
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLoans; 