export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>{book.title}</h2>
            <h4>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h4>
            {/* <img src={`assets/BooksImages/${imgNum}.jpg`} alt={book.title} /> */}
            {/* < img src={book.thumbnail}
            // onError={() => {
            //     src = `assets/BooksImages/${book.id}.jpg`
            // }}
            /> */}
        </article>
    )
}