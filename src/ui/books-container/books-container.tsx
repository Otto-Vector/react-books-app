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
import { Button } from '../common/Button/Button'

type MapStatePropsType = ReturnType<typeof mapStateToProps>


type MapDispatchType = {
    nextPage: ( currentPage: number ) => void
    nextIndex: ( startIndex: number ) => void
    getBooks: ( searchForm?: BooksRequest ) => void
}

type OwnProps = {}

type BooksContainerType = MapStatePropsType & MapDispatchType & OwnProps

const BooksContainer: React.FC<BooksContainerType> = (
    { books, totalBooks, booksToView, currentPage, isFetching, nextIndex, nextPage, getBooks } ) => {

    const totalPages = Math.ceil( totalBooks / booksToView )

    const nextPages = () => {
        nextPage( currentPage +1 )
        const currentIndex = (currentPage + 1) * booksToView
        nextIndex( currentIndex )
        getBooks()
    }

    return (<div>
            <Counter totalBooks={ totalBooks }/>
            <div className={ classes.wrapper }>
                { (books.length !== 0)
                    ? books.map( ( {
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
                    } )
                    : isFetching && <Preloader hSize={ '50rem' }/>
                }
            </div>
            { (books.length !== 0) &&
            <div className={ classes.bottomWrapper }>
              <Button disabled={ isFetching || (currentPage + 1 > totalPages) }
                      onClick={ nextPages }
                      mode={ 'Orange' }
                      title={ `${ totalBooks - books.length } more` }
              >  { isFetching && <Preloader hSize={ '2rem' }/> }
                  { ' Load more' }
              </Button>
            </div> }
        </div>
    )
}

const mapStateToProps = ( state: AppStateType ) => {
    return {
        books: state.requestFormReducer.books,
        isFetching: state.requestFormReducer.isFetching,
        totalBooks: state.requestFormReducer.totalBooks,
        booksToView: state.requestFormReducer.booksToView,
        currentPage: state.requestFormReducer.currentPage,
    }
}

const { nextPage, nextIndex } = requestFormActions

export default connect<MapStatePropsType, MapDispatchType, OwnProps, AppStateType>( mapStateToProps, {
    nextPage,
    nextIndex,
    getBooks,
} )( BooksContainer )
