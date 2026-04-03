import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BooksDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)
    const [count, pagesCount] = useState(null)

    useEffect(() => {
        bookService.get(bookId).then(fetchedBook => {
            setBook(fetchedBook)
        })
    }, [bookId])



function pagesCount(count){
    //TODO:
// if (book.pageCount < 100) return 'Serious reading'
// if (book.pageCount > 200) return 'Descent reading'
// if (book.pageCount > 500) return 'Light reading'
}



    if (!book) return <div>Loading...</div>

    return (
        <section className="book-details">
            <h1>Book details</h1>
            <h3>ID: {book.id}</h3 >
            <h3>Title: {book.title}</h3 >
            <h3>By: {book.authors}, {book.publishedDate}</h3 >
            <h3>{book.pageCount} pages</h3 >
            <h3>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h3>
            <h6>Description: {book.description}</h6 >
            <button onClick={onBack}>Back</button>
        </section >
    )
}