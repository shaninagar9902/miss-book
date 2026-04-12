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

    const { title, maxPrice } = filterByToEdit
    return (
        <section className="book-filter">
            <form onSubmit={(ev) => ev.preventDefault()}>
                <label htmlFor="title">Title:
                    <input id="title" name="title" type="text" value={title} placeholder="Filter by title..." onChange={handleChanges} />
                </label>
                <label htmlFor="maxPrice">Price:
                    <input id="maxPrice" name="maxPrice" type="number" value={maxPrice || ''} placeholder="Filter by price..." onChange={handleChanges} />
                </label>
            </form>
        </section>
    )
}