import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BooksDetails } from "./BooksDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {
    const [book, setBook] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        loadBook()
        // bookService.get(bookId).then(fetchedBook => {
        //     setBook(fetchedBook)
        // })
        // }, [bookId])
    }, [])

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBook(prevBook => prevBook.filter(book => bookId !== book.id))
        })
    }

    function onSelectBook(bookId) {
        setSelectedBook(bookId)
    }

    function loadBook() {
        bookService.query().then(books => { setBook(books) })
    }

    if (!book) return <div>Loading...</div>

    return (
        <section className="book-index">
            {!selectedBook &&
                <React.Fragment>
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