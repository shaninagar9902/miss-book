const { useState } = React

export function BookEdit({ onAddBook }) {

    const [bookToEdit, setBookToEdit] = useState({ title: '', amount: '' })

    function handleChange(
        { target }) {
        const { name, value, type } = target
        setBookToEdit(prev => ({
            ...prev,
            [name]: type === 'number' ? +value : value
        }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        if (!bookToEdit.title || !bookToEdit.amount) return alert('Please fill all fields')
        onAddBook(bookToEdit)
        setBookToEdit({ title: '', amount: '' })
    }
    return (
        <section className="book-edit">
            <h2>Add new book</h2>
            <form onSubmit={onSaveBook}>
                <input name="title" type="text" value={bookToEdit.title} placeholder="Title" onChange={handleChange} />
                <input name="amount" type="number" value={bookToEdit.amount} placeholder="Price" onChange={handleChange} />
                <button>Add Book</button>
            </form>
        </section>
    )

}