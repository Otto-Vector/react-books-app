import React, { useState } from 'react'
import classes from './books-container.module.scss'
import anyBookImage from '../../images/AnyBook.jpg'
import { useDispatch, useSelector } from 'react-redux'
import Counter from './Counter/Counter'
import Preloader from '../common/preloader/Preloader'
import { BookCard } from './book-card/book-card'
import { getBooks, requestFormActions } from '../../redux/request-form-reducer'
import { Button } from '../common/Button/Button'
import {
    getBooksList, getIsFetching,
    getPagination,
    getRequestBooks,
    getTotalBooksNumber,
} from '../../selectors/request-form-selectors'

const { nextIndex } = requestFormActions

type OwnProps = {}

export const BooksContainer: React.FC<OwnProps> = () => {

    const { maxResults, startIndex } = useSelector( getPagination )
    const dispatch = useDispatch()

    const isFetching = useSelector( getIsFetching )
    const request = useSelector( getRequestBooks )
    const totalBooks = useSelector( getTotalBooksNumber )

    const books = useSelector(getBooksList)

    const nextPage = () => {
        const _nextIndex = startIndex + maxResults
        dispatch( nextIndex( _nextIndex ) )
        dispatch( getBooks( request, { maxResults, startIndex: _nextIndex } ) )
    }

    const lastPage = (): boolean => {
        return (totalBooks-(startIndex+maxResults)) < 0
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
              <Button disabled={ isFetching || lastPage() }
                      onClick={ nextPage }
                      mode={ 'Orange' }
                      title={ `${ totalBooks - books.length } more` }
              >  { isFetching && <Preloader hSize={ '2rem' }/> }
                  { ' Load more' }
              </Button>
            </div> }
        </div>
    )
}
