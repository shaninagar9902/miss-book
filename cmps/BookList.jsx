import { BookPreview } from "./BookPreview.jsx";

const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook, onSelectBook }) {

    return (
        <ul className="book-list">
            {books.map(book =>
                <div key={book.id} className="card">
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
                        <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                        <button><Link to={`/book/${book.id}`}>Details</Link></button>
                    </section>
                </div>
            )}
        </ul >
    )
}