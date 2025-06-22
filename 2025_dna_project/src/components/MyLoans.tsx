import React from 'react';
import { useLoan, LoanRecord } from '../contexts/LoanContext';
import './MyLoans.css';

const MyLoans: React.FC = () => {
  const { loanRecords, updateLoanStatus, cancelReservation } = useLoan();

  const getStatusText = (status: LoanRecord['status']): string => {
    switch (status) {
      case 'active':
        return '대출 중';
      case 'completed':
        return '반납 완료';
      case 'overdue':
        return '연체';
      case 'reserved':
        return '대출 예정';
      default:
        return '';
    }
  };

  const getStatusClass = (status: LoanRecord['status']): string => {
    return `status-badge ${status}`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDaysLeft = (endDate: Date): number => {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateDaysUntilStart = (startDate: Date): number => {
    const today = new Date();
    const diffTime = startDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleReturn = (id: number) => {
    updateLoanStatus(id, 'completed');
  };

  const handleCancelReservation = (id: number) => {
    if (window.confirm('예약을 취소하시겠습니까?')) {
      cancelReservation(id);
    }
  };

  return (
    <div className="my-loans">
      <h1 className="section-title">내 대출 현황</h1>
      
      <div className="loan-status-summary">
        <div className="status-card">
          <h3>전체</h3>
          <p>{loanRecords.length}권</p>
        </div>
        <div className="status-card active">
          <h3>대출 중</h3>
          <p>{loanRecords.filter(record => record.status === 'active').length}권</p>
        </div>
        <div className="status-card reserved">
          <h3>대출 예정</h3>
          <p>{loanRecords.filter(record => record.status === 'reserved').length}권</p>
        </div>
        <div className="status-card completed">
          <h3>반납 완료</h3>
          <p>{loanRecords.filter(record => record.status === 'completed').length}권</p>
        </div>
        <div className="status-card overdue">
          <h3>연체</h3>
          <p>{loanRecords.filter(record => record.status === 'overdue').length}권</p>
        </div>
      </div>

      <div className="loan-records">
        {loanRecords.map(record => (
          <div key={record.id} className="loan-record-card">
            <img src={record.cover} alt={record.title} className="book-cover" />
            <div className="loan-info">
              <h3 className="book-title">{record.title}</h3>
              <p className="book-author">{record.author}</p>
              <div className="loan-dates">
                {record.status === 'reserved' ? (
                  <>
                    <p>대출 예정일: {formatDate(record.startDate)}</p>
                    <p>반납 예정일: {formatDate(record.endDate)}</p>
                    <p className="days-left">
                      대출까지: {calculateDaysUntilStart(record.startDate)}일
                    </p>
                  </>
                ) : (
                  <>
                    <p>대출일: {formatDate(record.startDate)}</p>
                    <p>반납 예정일: {formatDate(record.endDate)}</p>
                    {record.status === 'active' && (
                      <p className="days-left">
                        남은 기간: {calculateDaysLeft(record.endDate)}일
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="loan-actions">
                <span className={getStatusClass(record.status)}>
                  {getStatusText(record.status)}
                </span>
                {record.status === 'active' && (
                  <button 
                    className="return-button"
                    onClick={() => handleReturn(record.id)}
                  >
                    반납하기
                  </button>
                )}
                {record.status === 'reserved' && (
                  <button 
                    className="cancel-button"
                    onClick={() => handleCancelReservation(record.id)}
                  >
                    예약 취소
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLoans; 