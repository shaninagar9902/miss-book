import { BookList } from "../cmps/BookList.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BooksDetails } from "../pages/BooksDetails.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookIndex() {
    const [book, setBook] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBook()
        // bookService.get(bookId).then(fetchedBook => {
        //     setBook(fetchedBook)
        // })
        // }, [bookId])
    }, [filterBy])

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBook(prevBook => prevBook.filter(book => bookId !== book.id))
        })
    }

    function onAddBook(bookData) {
        bookService.save(bookData).then(savedBook => {
            setBook(prevBook => [savedBook, ...prevBook])
        })
    }

    function onSelectBook(bookId) {
        setSelectedBook(bookId)
    }

    function onSetFilterBy(filterBy) {
        // console.log('filterBy:', filterBy);
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function loadBook() {
        bookService.query(filterBy).then(books => setBook(books))
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBook &&
                <React.Fragment>
                    <BookEdit onAddBook={onAddBook} />
                    <BookFilter filterBy={filterBy}
                        onSetFilterBy={onSetFilterBy} />
                    <BookList books={book}
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