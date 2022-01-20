import React, { useState } from 'react'
import classes from './books-container.module.scss'
import anyBookImage from '../../images/AnyBook.jpg'
import { connect } from 'react-redux'

import { AppStateType } from '../../redux/redux-store'
import { BooksRequest } from '../../types/books-api-types'
import Counter from './Counter/Counter'
import Preloader from '../common/preloader/Preloader'
import { BookCard } from './book-card/book-card'
import { getBooks, requestFormActions } from '../../redux/request-form-reducer'

type MapStatePropsType = ReturnType<typeof mapStateToProps>


type MapDispatchType = {
    nextPage: ( startIndex: number ) => void
    getBooks: ( searchForm?: BooksRequest ) => void
}

type OwnProps = {}

type BooksContainerType = MapStatePropsType & MapDispatchType & OwnProps

const BooksContainer: React.FC<BooksContainerType> = (
    { books, totalBooks, booksToView, startIndex, isFetching, nextPage, getBooks } ) => {
    let totalPages = Math.ceil( totalBooks / booksToView )
    const [ currentPage, incrementCurrentPage ] = useState( 0 )

    const nextPages = () => {
        incrementCurrentPage( currentPage + 1 )
        let currentIndex = (currentPage + 1) * booksToView
        nextPage( currentIndex )
        getBooks()
    }

    return (<div>
            <Counter totalBooks={ totalBooks }/>
            <div className={ classes.wrapper }>
                { (books.length !== 0) && books.map( (
                    {
                        id,
                        volumeInfo: {
                            imageLinks, categories, title, authors,
                        },
                    } ) => {
                    let imageUrl = imageLinks ? (imageLinks.thumbnail || imageLinks.smallThumbnail) : anyBookImage
                    return <BookCard key={ id }
                                     id={ id }
                                     imageUrl={ imageUrl }
                                     category={ categories }
                                     title={ title }
                                     authors={ authors }
                    />
                } ) }
            </div>
            <div className={ classes.bottomWrapper }>
                { isFetching && <Preloader/> }
                <button className={ classes.button }
                        disabled={ books.length === 0 || isFetching || (currentPage + 1 === totalPages) }
                        onClick={ nextPages }
                >Load more
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = ( state: AppStateType ) => {
    return {
        books: state.requestFormReducer.books,
        isFetching: state.requestFormReducer.isFetching,
        totalBooks: state.requestFormReducer.totalBooks,
        booksToView: state.requestFormReducer.booksToView,
        startIndex: state.requestFormReducer.startIndex,
    }
}

const { nextPage } = requestFormActions

export default connect<MapStatePropsType, MapDispatchType, OwnProps, AppStateType>( mapStateToProps, {
    nextPage,
    getBooks,
} )( BooksContainer )
