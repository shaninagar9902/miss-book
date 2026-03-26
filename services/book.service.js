import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { booksData } from "../services/books-data.service.js"

const BOOK_KEY = 'bookDB'
// var gFilterBy = { txt: '', minSpeed: 0 }
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getNextBookId,
    // getFilterBy,
    getEmptyBook
}

function query() {
    return storageService.query(BOOK_KEY)
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function getEmptyBook(title = '', amount = '') {
    return {
        id: '',
        title,
        listPrice: { amount, currencyCode: "EUR", isOnSale: false }
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

// function getFilterBy() {
//     return { ...gFilterBy }
// }

// function setFilterBy(filterBy = {}) {
//     if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
//     if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
//     return gFilterBy
// }