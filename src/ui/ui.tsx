import React from 'react'
import classes from './ui.module.scss'
import Header from './header/header'
import BooksContainer from './books-container/books-container'
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'
import { BookInfo } from './BookInfo/book-info'

export const UiComponent: React.FC = () => {

    return (
        <section className={ classes.ui }>
            <Header/>
            <div>
                <Switch>
                    <Route exact path='/' render={ () => <Redirect to={ '/search' }/> }/>
                    <Route path='/search' render={ () => <BooksContainer/> }/>
                    <Route path='/book/:bookId?' render={ () => <BookInfo/> }/>
                    <Route render={ () => <h1>This site NOT FOUND. Try another address</h1> }/>
                </Switch>
            </div>
        </section>
    )
}
