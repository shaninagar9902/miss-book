import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { BookIndex } from './pages/BookIndex.jsx';
import { SurveyIndex } from './pages/SurveyIndex.jsx';
import { UserMsg } from './cmps/UserMsg.jsx';
import { BookAdd } from './cmps/BookAdd.jsx';
import { BookDetails } from './pages/BookDetails.jsx';
import { BookEdit } from './pages/BookEdit.jsx';

const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, NavLink } = ReactRouterDOM

export function App() {
    // const [page, setPage] = useState('Home')

    return (
        <Router>
            <section className="app">
                <header className="app-header">
                    <NavLink to="/" className="title">Miss Book</NavLink>
                    <nav className='navbar'>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/book">Books</NavLink>
                    </nav>
                    <UserMsg />
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/survey" element={<SurveyIndex />} />
                        <Route path="/book/add" element={<BookAdd />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}