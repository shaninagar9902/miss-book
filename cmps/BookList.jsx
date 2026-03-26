import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook, onSelectBook }) {

    return (
        <ul className="book-list">
            {books.map(book =>
                <div key={book.id} className="card">
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
                        <button onClick={() => onSelectBook(book.id)}>Details</button>
                    </section>
                </div>
            )}
        </ul>
    )
}