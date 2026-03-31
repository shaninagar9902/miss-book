import { BookList } from "../cmps/BookList.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BooksDetails } from "../pages/BooksDetails.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        bookService.query(filterBy).then(books => setBooks(books))
        // bookService.get(bookId).then(fetchedBook => {
        //     setBook(fetchedBook)
        // })
        // }, [bookId])
    }, [filterBy])

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBooks(prevBooks => prevBooks.filter(book => bookId !== book.id))
        })
    }

    function onAddBook(bookData) {
        bookService.save(bookData).then(savedBook => {
            setBooks(prevBook => [savedBook, ...prevBook])
        })
    }

    function onSelectBook(bookId) {
        setSelectedBook(bookId)
    }

    function onSetFilterBy(filterBy) {
        // console.log('filterBy:', filterBy);
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBook &&
                <React.Fragment>
                    <BookEdit onAddBook={onAddBook} />
                    <BookFilter filterBy={filterBy}
                        onSetFilterBy={onSetFilterBy} />
                    <BookList books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBook={onSelectBook} />
                </React.Fragment>}
            {selectedBook && (
                <BooksDetails
                    onBack={() => onSelectBook(null)}
                    bookId={selectedBook} />)}
        </section>
    )
}