const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChanges({ target }) {
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
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }
    const { title, minPrice } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter our books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Title: </label>
                <input required id="title" name="title" type="text" value={title} placeholder="By title..." onChange={handleChanges} />
                <label htmlFor="minPrice">Price: </label>
                <input required id="minPrice" name="minPrice" type="number" value={minPrice} placeholder="By price..." onChange={handleChanges} />
                <button>Set Filter</button>
            </form>
        </section>
    )
}