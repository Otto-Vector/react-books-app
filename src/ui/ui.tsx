import React from 'react'
import classes from './ui.module.scss'
import { Header } from './header/header'
import { BooksContainer } from './books-container/books-container'
import {
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { BookInfo, BookPreview } from './BookInfo/book-info'

export const UiComponent: React.FC = () => {

    return (
        <section className={ classes.ui }>
            <Header/>
            <div>
                <Routes>
                    <Route path='/' element={ <Navigate to={ '/search' }/> }/>
                    <Route path='/search' element={ <BooksContainer/> }/>
                    {/*<Route path='/book/:bookId' element={ <BookInfo/> }/>*/}
                    <Route path='/book/:bookId' element={ <BookPreview/> }/>
                    <Route path='*' element={ <h1>This site NOT FOUND. Try another address</h1> }/>
                </Routes>
            </div>
        </section>
    )
}
