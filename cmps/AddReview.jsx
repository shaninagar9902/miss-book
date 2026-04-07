import { bookService } from "../services/book.service.js"

const { useState } = React

export function AddReview({ bookId, onReviewAdded }) {
    const [bookReview, setBookReview] = useState({
        fullname: '',
        rating: 1,
        readAt: ''
    })

    // function onLoad() {
    //     bookService.get(bookId)
    //         .then(onReviewAdded)
    //         .catch(err => alert('Error!', err))
    // }

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
        setBookReview(prevBookReview => ({ ...prevBookReview, [field]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.addReview(bookId, bookReview)
            .then(() => onReviewAdded())
            .catch(err => alert('Error!', err))
    }

    const { fullname, rating, readAt } = bookReview

    return (
        < section className="book-review" >
            <form onSubmit={onSaveReview}>
                <label htmlFor="fullname">Full Name:</label>
                <input required id="fullname" name="fullname" type="text" value={fullname} placeholder="Enter your full name" onChange={handleChange} />
                <label htmlFor="rating">Rate Book:</label>
                <select id="rating" name="rating" value={rating} onChange={handleChange}>
                    <option value={1}>⭐</option>
                    <option value={2}>⭐⭐</option>
                    <option value={3}>⭐⭐⭐</option>
                    <option value={4}>⭐⭐⭐⭐</option>
                    <option value={5}>⭐⭐⭐⭐⭐</option>
                </select>
                <label htmlFor="readAt">Read At:</label>
                <input required id="readAt" name="readAt" type="date" value={readAt} onChange={handleChange} />
                <button>Add</button>
            </form>
        </section >
    )
}