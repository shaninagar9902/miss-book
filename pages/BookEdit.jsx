import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.bookId) load()
    }, [])

    function load() {
        bookService.get(params.bookId)
            .then(setBookToEdit)
            .catch(err => alert('Error!', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break;

            default:
                break;
        }
        if (field === 'price') {
            setBookToEdit(prev => ({
                ...prev,
                listPrice: { ...prev.listPrice, amount: value }
            }))
        } else {
            setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => navigate('/book'))
            .catch(err => alert('Error!', err))
    }

    const { title, listPrice } = bookToEdit
    return (
        <section className="book-edit">
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input id="title" name="title" type="text" value={title} placeholder="Enter Title" onChange={handleChange} />
                <label htmlFor="price">Price:</label>
                <input id="price" name="price" type="number" value={listPrice.amount} placeholder="Enter Price" onChange={handleChange} />
                <button>{params.bookId ? 'Update Book' : 'Add Book'}</button>
            </form>
        </section>
    )
}