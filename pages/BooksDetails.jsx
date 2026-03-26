import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BooksDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId).then(fetchedBook => {
            setBook(fetchedBook)
        })
    }, [bookId])

    if (!book) return <div>Loading...</div>

    return (
        <section className="book-details">
            <h1>Book details</h1>
            <h3>{book.id}</h3 >
            <h3>{book.title}</h3 >
            {/* <h6>{book.description}</h6 > */}
            {/* <h4>{book.authors}</h4 > */}
            <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <button onClick={onBack}>Back</button>
        </section >
    )
}