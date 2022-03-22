import React from 'react'
import classes from './books-container.module.scss'
import anyBookImage from '../../images/AnyBook.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { Counter } from './counter/counter'
import { Preloader } from '../common/preloader/preloader'
import { BookCard } from './book-card/book-card'
import { getBooks, requestFormActions } from '../../redux/request-form-reducer'
import { Button } from '../common/button/button'
import {
    getBooksList,
    getIsFetching,
    getPagination,
    getRequestBooks,
    getTotalBooksNumber,
} from '../../selectors/request-form-selectors'
import { FastScrollButton } from '../common/fast-scroll-button/fast-scroll-button'


type OwnProps = {}

export const BooksContainer: React.FC<OwnProps> = () => {

    const { maxResults, startIndex } = useSelector( getPagination )
    const dispatch = useDispatch()

    const isFetching = useSelector( getIsFetching )
    const request = useSelector( getRequestBooks )
    const totalBooks = useSelector( getTotalBooksNumber )
    const books = useSelector( getBooksList )

    const nextPage = () => {
        const _nextIndex = startIndex + maxResults
        dispatch( requestFormActions.nextIndex( _nextIndex ) )
        dispatch( getBooks( request, { maxResults, startIndex: _nextIndex } ) )
    }

    const lastPage = (): boolean => {
        return (totalBooks - (startIndex + maxResults)) <= 0
    }

    const loadMoreBooksLeft = (): string => {
        const total = totalBooks - books.length
        return `${ total < 1 ? 0 : total } more`
    }

    return (<div>
            { isFetching || totalBooks<0 || <Counter totalBooks={ totalBooks }/> }
            <div className={ classes.booksContainer }>
                { books.length > 0
                    ? books.map( ( {
                                       id,
                                       volumeInfo: {
                                           imageLinks, categories, title, authors,
                                       },
                                   } ) => {
                        return <BookCard key={ id }
                                         id={ id }
                                         imageUrl={ imageLinks?.thumbnail || imageLinks?.smallThumbnail || anyBookImage }
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
                      title={ loadMoreBooksLeft() }
              >  { isFetching && <Preloader hSize={ '2rem' }/> }
                  { ' Load more' }
              </Button>
            </div> }
            <div className={ classes.scrollButtonsPanelFixed }>
                <div className={ classes.scrollButtonsPanel }>
                    <FastScrollButton mode={ 'top' }/>
                    <FastScrollButton mode={ 'bottom' }/>
                </div>
            </div>

        </div>
    )
}
