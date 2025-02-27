import { useState } from "react";
import booksData from "../../js/data/book_data.json";
import "../../css/page/book-list.scss";

function BookList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("제목");
  const [filteredBooks, setFilteredBooks] = useState(booksData);

  // 검색 기능
//   const handleSearch = () => {
//     const filtered = booksData.filter((book) =>
//       book[searchOption].toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(filtered);
//   };

  return (
    <div className="contents">
      {/* 도서 리스트 */}
      <div className="book-list-wrap">
        <ul className="book-list">
          {filteredBooks.map((book) => (
            <li key={book.ISBN}>
              <a href="#" className="item">
                <div className="img-box">
                  <img src={`../img/book/img-${book.ISBN}.jpg`} alt={book.title} />
                </div>
                <div className="text-box">
                  <div className="book-tit">
                    <p>{book.title}</p>
                    <span className="label">{book.category}</span>
                  </div>
                  <ul className="book-info">
                    <li><em>저자</em><span className="writer">{book.author}</span></li>
                    <li><em>출판사</em><span className="publisher">{book.publisher}</span></li>
                  </ul>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BookList;
