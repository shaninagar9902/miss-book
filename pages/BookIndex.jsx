import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BooksDetails } from "./BooksDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {
    const [book, setBook] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId).then(fetchedBook => {
            setBook(fetchedBook)
        })
    }, [bookId])

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBook(prevBook => prevBook.filter(book => bookId !== book.id))
        })
    }

    return (
        <section>
            <h1>Our books</h1>
        </section>
    )
}