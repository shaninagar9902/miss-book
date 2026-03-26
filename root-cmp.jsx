import { Home } from '../pages/Home.jsx';
import { About } from '../pages/About.jsx';
import { BookIndex } from '../pages/BookIndex.jsx';

const { useState } = React;

export function App() {

    const [page, setPage] = useState('book')

    return (
        <section className="app">
            <header className="app-header">
                <h1>Miss book</h1>
                <nav className='navbar'>
                    <a onClick={(ev) => { ev.preventDefault(); setPage('About') }} href="">About</a>
                    <a onClick={(ev) => { ev.preventDefault(); setPage('Home') }} href="">Home</a>
                    <a onClick={(ev) => { ev.preventDefault(); setPage('BookIndex') }} href="">Books</a>
                </nav>
            </header>

            <main>
                {page === 'Home' && <Home />}
                {page === 'About' && <About />}
                {page === 'BookIndex' && <BookIndex />}
            </main>
        </section>
    )
}