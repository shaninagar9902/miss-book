import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { booksData } from "../services/books-data.service.js"

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    addReview,
    removeReview
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regEXP = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regEXP.test(book.title))
            }
            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.maxPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => _setNextPrevBookId(book))
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        //     const newBook = _createBook(book.title, book.amount)
        return storageService.post(BOOK_KEY, book)
    }
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function getEmptyBook(title = '', amount = '') {
    return {
        id: '',
        title,
        authors: [],
        listPrice: { amount, currencyCode: "ILS", isOnSale: false }
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksData || []
        books.push(_createBook('Twilight', 100))
        books.push(_createBook('After', 70))
        books.push(_createBook('Cinderella', 50))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, amount = 120) {
    const book = getEmptyBook(title, amount)
    book.id = utilService.makeId()
    return book
}

function getDefaultFilter() { return { title: '', maxPrice: '' } }

function addReview(bookId, review) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            const newReview = { ...review, id: utilService.makeId() }
            book.reviews = book.reviews || []
            book.reviews.unshift(newReview)
            return storageService.put(BOOK_KEY, book)
        })
}

function removeReview(bookId, reviewId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book.reviews = book.reviews.filter(R => R.id !== reviewId)
            return storageService.put(BOOK_KEY, book)
        })
}