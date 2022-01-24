import { createSelector } from 'reselect'
import { AppStateType } from '../redux/redux-store'
import { RequestFormReducerStateType } from '../redux/request-form-reducer'
import { ItemBook } from '../types/books-api-types'

type RequestFormSelectors<T extends keyof Y, Y = RequestFormReducerStateType> = ( state: AppStateType ) => Y[T]

export const getIsFetching: RequestFormSelectors<'isFetching'> = ( state ) => state.requestFormReducer.isFetching
export const getBooksList: RequestFormSelectors<'books'> = ( state ) => state.requestFormReducer.books
export const getRequestBooks: RequestFormSelectors<'request'> = ( state ) => state.requestFormReducer.request
export const getPagination: RequestFormSelectors<'pagination'> = ( state ) => state.requestFormReducer.pagination
export const getTotalBooksNumber: RequestFormSelectors<'totalBooks'> = ( state ) => state.requestFormReducer.totalBooks
export const getBookIdToView: RequestFormSelectors<'bookIdToView'> = ( state ) => state.requestFormReducer.bookIdToView

export const getOneBookFromLocal = createSelector( getBooksList, getBookIdToView,
    ( booksList, bookId ): ItemBook['volumeInfo'] | undefined => {
        return booksList.filter( ( book ) => book.id === bookId )[0]?.volumeInfo
    } )
