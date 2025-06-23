import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './PopularBooks.css';
import { useLoan } from '../contexts/LoanContext';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  rating: number;
  loanCount: number;
  isLoaned: boolean;
  popularityScore?: number;
  genre: string;
}

interface LoanModalProps {
  book: Book;
  onClose: () => void;
  onConfirm: (startDate: Date) => void;
  loanPeriod: number;
}

const LoanModal: React.FC<LoanModalProps> = ({ book, onClose, onConfirm, loanPeriod }) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7); // 최대 7일 후까지 선택 가능

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + loanPeriod);

  return (
    <div className="loan-modal">
      <div className="loan-modal-content">
        <h2>대출 신청</h2>
        <div className="loan-book-info">
          <h3>{book.title}</h3>
          <p>저자: {book.author}</p>
          <p>대출 가능 기간: {loanPeriod}일</p>
        </div>
        <div className="date-picker-container">
          <label>대출 시작일</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => date && setStartDate(date)}
            minDate={new Date()}
            maxDate={maxDate}
            dateFormat="yyyy/MM/dd"
          />
          <p className="return-date">반납 예정일: {endDate.toLocaleDateString()}</p>
        </div>
        <div className="loan-modal-buttons">
          <button className="loan-confirm-button" onClick={() => onConfirm(startDate)}>
            대출 확인
          </button>
          <button className="loan-cancel-button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

// 인기도 점수 계산 함수
const calculatePopularityScore = (rating: number, loanCount: number): number => {
  // 평점(0-5)을 0-100 스케일로 변환
  const normalizedRating = (rating / 5) * 100;
  // 대출 횟수는 로그 스케일로 변환하여 극단적인 차이를 완화
  const normalizedLoanCount = Math.min(Math.log10(loanCount + 1) * 25, 100);
  // 평점 60%, 대출 횟수 40% 비중으로 계산
  return (normalizedRating * 0.6 + normalizedLoanCount * 0.4);
};

// 인기도 점수에 따른 대출 기간 계산 함수
const calculateLoanPeriod = (popularityScore: number): number => {
  if (popularityScore >= 90) return 3;    // S등급: 3일
  if (popularityScore >= 80) return 7;    // A등급: 7일
  if (popularityScore >= 70) return 10;   // B등급: 10일
  return 14;                              // C등급: 14일
};

// 인기도 등급 표시 함수
const getPopularityGrade = (popularityScore: number): string => {
  if (popularityScore >= 90) return 'S';
  if (popularityScore >= 80) return 'A';
  if (popularityScore >= 70) return 'B';
  return 'C';
};

// 임시 도서 데이터
const books: Book[] = [
  {
    id: 1,
    title: "클린 코드",
    author: "로버트 C. 마틴",
    cover: "https://covers.openlibrary.org/b/id/12791419-L.jpg",
    rating: 4.8,
    loanCount: 150,
    isLoaned: false,
    genre: "개발방법론"
  },
  {
    id: 2,
    title: "리팩터링 2판",
    author: "마틴 파울러",
    cover: "https://covers.openlibrary.org/b/id/10131870-L.jpg",
    rating: 4.7,
    loanCount: 120,
    isLoaned: false,
    genre: "개발방법론"
  },
  {
    id: 3,
    title: "객체지향의 사실과 오해",
    author: "조영호",
    cover: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788998139766.jpg",
    rating: 4.6,
    loanCount: 90,
    isLoaned: false,
    genre: "개발방법론"
  },
  {
    id: 4,
    title: "실용주의 프로그래머",
    author: "데이비드 토머스, 앤드류 헌트",
    cover: "https://covers.openlibrary.org/b/id/10088428-L.jpg",
    rating: 4.7,
    loanCount: 110,
    isLoaned: false,
    genre: "개발방법론"
  },
  {
    id: 5,
    title: "Head First Design Patterns",
    author: "에릭 프리먼",
    cover: "https://covers.openlibrary.org/b/id/10266224-L.jpg",
    rating: 4.5,
    loanCount: 80,
    isLoaned: false,
    genre: "디자인패턴"
  },
  {
    id: 6,
    title: "모던 자바스크립트 Deep Dive",
    author: "이웅모",
    cover: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158392239.jpg",
    rating: 4.8,
    loanCount: 200,
    isLoaned: false,
    genre: "JavaScript"
  },
  {
    id: 7,
    title: "이펙티브 타입스크립트",
    author: "댄 밴더캄",
    cover: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966263134.jpg",
    rating: 4.6,
    loanCount: 130,
    isLoaned: false,
    genre: "TypeScript"
  },
  {
    id: 8,
    title: "Do it! 리액트 프로그래밍 정석",
    author: "박호준",
    cover: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791163033035.jpg",
    rating: 4.5,
    loanCount: 150,
    isLoaned: false,
    genre: "React"
  },
  {
    id: 9,
    title: "코어 자바스크립트",
    author: "정재남",
    cover: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158391720.jpg",
    rating: 4.7,
    loanCount: 140,
    isLoaned: false,
    genre: "JavaScript"
  },
  {
    id: 10,
    title: "러닝 타입스크립트",
    author: "조시 골드버그",
    cover: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791169210218.jpg",
    rating: 4.6,
    loanCount: 110,
    isLoaned: false,
    genre: "TypeScript"
  },
  {
    id: 11,
    title: "리액트를 다루는 기술",
    author: "김민준",
    cover: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791165343132.jpg",
    rating: 4.7,
    loanCount: 170,
    isLoaned: false,
    genre: "React"
  },
  {
    id: 12,
    title: "클린 아키텍처",
    author: "로버트 C. 마틴",
    cover: "https://covers.openlibrary.org/b/id/12791432-L.jpg",
    rating: 4.7,
    loanCount: 130,
    isLoaned: false,
    genre: "개발방법론"
  },
  {
    id: 13,
    title: "도메인 주도 설계",
    author: "에릭 에반스",
    cover: "https://covers.openlibrary.org/b/id/9780321125217-L.jpg",
    rating: 4.6,
    loanCount: 100,
    isLoaned: false,
    genre: "개발방법론"
  },
  {
    id: 14,
    title: "GoF의 디자인 패턴",
    author: "에릭 감마",
    cover: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791195444953.jpg",
    rating: 4.8,
    loanCount: 90,
    isLoaned: false,
    genre: "디자인패턴"
  },
  {
    id: 15,
    title: "You Don't Know JS",
    author: "카일 심슨",
    cover: "https://covers.openlibrary.org/b/id/7436096-L.jpg",
    rating: 4.7,
    loanCount: 160,
    isLoaned: false,
    genre: "JavaScript"
  },
  {
    id: 16,
    title: "프로 타입스크립트",
    author: "대니얼 로스코",
    cover: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966263400.jpg",
    rating: 4.5,
    loanCount: 120,
    isLoaned: false,
    genre: "TypeScript"
  },
  {
    id: 17,
    title: "Next.js in Action",
    author: "성도네",
    cover: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158394646.jpg",
    rating: 4.6,
    loanCount: 140,
    isLoaned: false,
    genre: "React"
  },
  {
    id: 18,
    title: "테스트 주도 개발",
    author: "켄트 벡",
    cover: "https://covers.openlibrary.org/b/id/10088512-L.jpg",
    rating: 4.7,
    loanCount: 110,
    isLoaned: false,
    genre: "개발방법론"
  },
  {
    id: 19,
    title: "자바스크립트 완벽 가이드",
    author: "데이비드 플래너건",
    cover: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791169210010.jpg",
    rating: 4.8,
    loanCount: 180,
    isLoaned: false,
    genre: "JavaScript"
  },
  {
    id: 20,
    title: "타입스크립트 프로그래밍",
    author: "보리스 체르니",
    cover: "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791165213878.jpg",
    rating: 4.6,
    loanCount: 100,
    isLoaned: false,
    genre: "TypeScript"
  }
];

const PopularBooks: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('전체');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { addLoan } = useLoan();

  // 모든 장르 목록 추출
  const genres = ['전체', ...Array.from(new Set(books.map(book => book.genre)))];

  // 인기도 점수 계산 및 정렬
  const processedBooks = books.map(book => ({
    ...book,
    popularityScore: calculatePopularityScore(book.rating, book.loanCount)
  })).sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));

  // 장르 필터링
  const filteredBooks = processedBooks.filter(book => {
    return selectedGenre === '전체' || book.genre === selectedGenre;
  });

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleLoanRequest = (book: Book) => {
    setSelectedBook(book);
  };

  const handleLoanConfirm = (startDate: Date) => {
    if (selectedBook) {
      const endDate = new Date(startDate);
      const loanPeriod = calculateLoanPeriod(selectedBook.popularityScore || 0);
      endDate.setDate(startDate.getDate() + loanPeriod);

      // LoanContext에 대출 정보 추가
      addLoan({
        bookId: selectedBook.id,
        title: selectedBook.title,
        author: selectedBook.author,
        cover: selectedBook.cover,
        startDate: startDate,
        endDate: endDate,
        status: 'reserved'
      });

      alert(
        `"${selectedBook.title}" 대출이 예약되었습니다.\n` +
        `대출 예정일: ${startDate.toLocaleDateString()}\n` +
        `반납 예정일: ${endDate.toLocaleDateString()}`
      );
      setSelectedBook(null);
    }
  };

  return (
    <div className="popular-books">
      <h1 className="section-title">인기 도서</h1>

      {/* 장르 필터 */}
      <div className="genre-filter">
        {genres.map(genre => (
          <button
            key={genre}
            className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => handleGenreSelect(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* 선택된 장르 표시 */}
      <div className="selected-genre">
        {selectedGenre}
        <span className="book-count">({filteredBooks.length}권)</span>
      </div>

      {/* 도서 목록 */}
      <div className="books-container">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.cover} alt={book.title} className="book-cover" />
            <div className="book-info">
              <span className="book-genre">{book.genre}</span>
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              
              <div className="book-rating">
                <span className="rating-text">{book.rating.toFixed(1)}</span>
                <span className="rating-star">★</span>
              </div>

              <div className="book-popularity">
                <p>인기도: {book.popularityScore?.toFixed(1)}점 (등급: {getPopularityGrade(book.popularityScore || 0)})</p>
                <p>대출 횟수: {book.loanCount}회</p>
                <p>대출 가능 기간: {calculateLoanPeriod(book.popularityScore || 0)}일</p>
              </div>

              <button
                className={`loan-button ${book.isLoaned ? 'loaned' : ''}`}
                onClick={() => !book.isLoaned && handleLoanRequest(book)}
                disabled={book.isLoaned}
              >
                {book.isLoaned ? '대출 중' : '예약하기'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 대출 모달 */}
      {selectedBook && (
        <LoanModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onConfirm={handleLoanConfirm}
          loanPeriod={calculateLoanPeriod(selectedBook.popularityScore || 0)}
        />
      )}
    </div>
  );
};

export default PopularBooks;
