export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Book Title: {book.title}</h2>
            <h4>Book Amount: {book.amount}</h4>
        </article>
    )
}