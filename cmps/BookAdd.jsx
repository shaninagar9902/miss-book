import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

export function BookAdd() {
    // console.log('hello');

    const [searchBook, setSearchBook] = useState('')
    const [googleBooks, setGoogleBooks] = useState([])
    const navigate = useNavigate()
    const searchDebounce = useRef(utilService.debounce(searchFromGoogle, 500))

    useEffect(() => {
        if (!searchBook.trim()) {
            setGoogleBooks([])
            return
        }
        // if (searchBook.length < 2) return
        searchDebounce.current(searchBook)
    }, [searchBook])

    function handleChanges({ target }) {
        setSearchBook(target.value)
    }

    function searchFromGoogle(term) {
        if (!term) {
            setGoogleBooks([])
            return
        }
        bookService.getGoogleBooks(term)
            .then(books => setGoogleBooks(books))
            .catch(err => console.log('Had error searching google', err))
    }

    function onAddBook(googleBooks) {
        bookService.addGoogleBook(googleBooks)
            .then(() => {
                showSuccessMsg(`Book added!`)
            })
            .catch(err => {
                alert('Error!', err)
                showErrorMsg(`Problem adding book`)
            })
    }

    return (
        <section className="book-search">
            <form onSubmit={(ev) => ev.preventDefault()}>
                <button onClick={() => navigate('/book')}>Back</button>
                <label htmlFor="search">Search Google Books:
                    <input id="search" name="search" type="search" value={searchBook} placeholder="Search by title..." onChange={handleChanges} />
                </label>
            </form>
            <ul className="google-book-list">
                {googleBooks.map(book => (
                    <li key={book.id}>
                        {book.volumeInfo.title}
                        {/* <button onClick={() => console.log('Adding...', book)}>+</button> */}
                        <button onClick={() => onAddBook(book)}>+</button>
                    </li>
                ))}
            </ul>
        </section>
    )
}