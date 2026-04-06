import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)
    const [isAddingReview, setIsAddingReview] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        load()
    }, [params.bookId])

    function load() {
        bookService.get(params.bookId)
            .then(fetchedBook => {
                setBook(fetchedBook)
            })
            .catch(err => {
                console.log('err:', err);
                navigate('/book')
            })
        bookService.getNextBookId(params.bookId)
            .then(setNextBookId)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function getReadingType() {
        let pageCount = book.pageCount
        if (pageCount >= 500) return 'Serious reading'
        else if (pageCount >= 200) return 'Decent reading'
        else if (pageCount <= 100) return 'Light reading'
        return 'Good reading'
    }

    function getPublish() {
        let currYear = new Date().getFullYear()
        const diff = currYear - book.publishedDate
        if (diff > 10) return 'Vintage'
        else if (diff <= 1) return 'New'
    }

    function getAmount() {
        let amount = book.listPrice.amount
        if (amount > 150) return { color: 'red' }
        else if (amount < 20) return { color: 'green' }
        return {}
    }

    function onSale() {
        if (book.listPrice.isOnSale) return 'On sale!'
    }

    function onReviewAdded() {
        load()
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(params.bookId, reviewId)
            .then(() => load())
            .catch(err => {
                console.log('err:', err)
            })
    }

    if (!book) return <div>Loading...</div>

    return (
        <section className="book-details">
            <button onClick={() => navigate('/book')}>Back</button>
            <h1>Book details</h1>
            <h3>ID: {book.id}</h3 >
            <h3>Title: {book.title}</h3 >
            <h3>By: {book.authors.join(',')}, {book.publishedDate} ({getPublish()})</h3 >
            <h3>{book.pageCount} pages - {getReadingType()}</h3 >
            <h3>Price: <span style={getAmount()}> {book.listPrice.amount} {book.listPrice.currencyCode}</span></h3>
            <h2>{onSale()}</h2>
            <div className="reviews">
                <h3>Reviews</h3>
                {!book.reviews || !book.reviews.length ? <p>No reviews yet</p> : <ul>
                    {book.reviews.map(review => (
                        <li key={review.id}>
                            <p>{review.fullname}</p>
                            <p>{review.rating}</p>
                            <p>{review.readAt}</p>
                            <button onClick={() => onRemoveReview(review.id)}>Remove</button>
                        </li>
                    ))}
                </ul>}
            </div>
            {isAddingReview
                ? <AddReview
                    bookId={params.bookId}
                    onReviewAdded={() => {
                        onReviewAdded()
                        setIsAddingReview(false)
                    }} />
                : <button onClick={() => setIsAddingReview(true)}>Add Review</button>
            }
            <div className="description-container">
                <h3>Description:</h3>
                <LongTxt txt={book.description} length={100} />
            </div>
            {nextBookId && <Link to={`/book/${nextBookId}`}>Next Book</Link>}
        </section >
    )
}