
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        bookService.query(filterBy)
            .then(books => { setBooks(books) })
            .catch(err => alert('Error!', err))
    }, [filterBy])

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => bookId !== book.id))
                showSuccessMsg(`Book removed! ${bookId}`)
            })
            .catch(err => {
                alert('Error!', err)
                showErrorMsg(`Problem Removing` + bookId)
            })
    }

    // function onAddBook(bookData) {
    //     bookService.save(bookData).then(savedBook => {
    //         setBooks(prevBook => [savedBook, ...prevBook])
    //     })
    //         .catch(err => alert('Error!', err))
    // }

    function onSetFilterBy(filterBy) {
        // console.log('filterBy:', filterBy);
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books.length) return <div>Loading...</div>
    return (
        <section className="book-index">
            <BookFilter filterBy={filterBy}
                onSetFilterBy={onSetFilterBy} />
            <Link to="/book/edit">Add Book</Link>
            <BookList books={books}
                onRemoveBook={onRemoveBook} />
        </section>
    )
}