import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useState, useEffect } = React

export function BooksDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId).then(fetchedBook => {
            setBook(fetchedBook)
        })
    }, [bookId])

    function getReadingType() {
        let pageCount = book.pageCount
        if (pageCount >= 500) return 'Serious reading'
        else if (pageCount >= 200) return 'Decent reading'
        else if (pageCount <= 100) return 'Light reading'
        return 'Good reading'
    }

    function getPublish() {
        let currYear = new Date().getFullYear()
        const diff = currYear - book.publishedDate
        if (diff > 10) return 'Vintage'
        else if (diff <= 1) return 'New'
    }

    function getAmount() {
        let amount = book.listPrice.amount
        if (amount > 150) return { color: 'red' }
        else if (amount < 20) return { color: 'green' }
        return {}
    }

    function onSale() {
        if (book.listPrice.isOnSale) return 'On sale!'
    }

    if (!book) return <div>Loading...</div>

    return (
        <section className="book-details">
            <h1>Book details</h1>
            <h3>ID: {book.id}</h3 >
            <h3>Title: {book.title}</h3 >
            <h3>By: {book.authors.join(',')}, {book.publishedDate} ({getPublish()})</h3 >
            <h3>{book.pageCount} pages - {getReadingType()}</h3 >
            <h3>Price: <span style={getAmount()}> {book.listPrice.amount} {book.listPrice.currencyCode}</span></h3>
            <h2>{onSale()}</h2>
            <div className="description-container">
                <h3>Description:</h3>
                <LongTxt txt={book.description} length={100} />
            </div>
            <button onClick={onBack}>Back</button>
        </section >
    )
}