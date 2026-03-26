// import { booksData } from "../services/books-data.service.js"
import { bookService } from "../services/book.service.js"
const { useState, useEffect } = React

export function BooksDetails({ bookId }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId).then(fetchedBook => {
            setBook(fetchedBook)
        })
    }, [bookId])

    if (!book) return <div>Loading...</div>

    return (
        <section className="book-details">
            <h1>Our books</h1>
            <div className="book-card">
                <h3>{book.id}</h3 >
                <h3>{book.title}</h3 >
                <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            </div >
        </section >
    )
}