import React from 'react'
import classes from './books-container.module.scss'
import anyBookImage from '../../images/any-book-gray.jpg'
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

    // вычисляем общеиспользуемые значения
    const nextIndex = startIndex + maxResults
    const booksLeft = totalBooks - nextIndex
    const isLastPage = booksLeft < 1

    const nextPage = () => {
        dispatch( requestFormActions.nextIndex( nextIndex ) )
        dispatch( getBooks( request, { maxResults, startIndex: nextIndex } ) )
    }

    const loadMoreBooksLeft = (): string => `${ isLastPage ? 0 : booksLeft } more`


    return (<div>
            { isFetching || totalBooks < 0 || <Counter totalBooks={ totalBooks }/> }
            <div className={ classes.booksContainer }>
                { books.length > 0
                    ? books.map( ( {
                                       id,
                                       volumeInfo: {
                                           imageLinks, categories, title, authors,
                                       },
                                   }, index ) => {
                        return <BookCard key={ id+index }
                                         id={ id }
                                         imageUrl={ imageLinks?.thumbnail || imageLinks?.smallThumbnail || anyBookImage }
                                         category={ categories }
                                         title={ title }
                                         authors={ authors }
                                         index={ index + 1 }
                        />
                    } )
                    : isFetching && <Preloader hSize={ '50rem' }/>
                }
            </div>
            { (books.length !== 0) &&
            <div className={ classes.bottomWrapper }>
              <Button disabled={ isFetching || isLastPage }
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
