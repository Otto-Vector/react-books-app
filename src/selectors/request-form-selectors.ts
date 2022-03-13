import { AppStateType } from '../redux/redux-store'
import { RequestFormReducerStateType } from '../redux/request-form-reducer'

type RequestFormSelectors<T extends keyof Y, Y = RequestFormReducerStateType> = ( state: AppStateType ) => Y[T]

export const getIsFetching: RequestFormSelectors<'isFetching'> = ( state ) => state.requestFormReducer.isFetching
export const getBooksList: RequestFormSelectors<'books'> = ( state ) => state.requestFormReducer.books
export const getRequestBooks: RequestFormSelectors<'request'> = ( state ) => state.requestFormReducer.request
export const getPagination: RequestFormSelectors<'pagination'> = ( state ) => state.requestFormReducer.pagination
export const getTotalBooksNumber: RequestFormSelectors<'totalBooks'> = ( state ) => state.requestFormReducer.totalBooks
export const getBookToView: RequestFormSelectors<'bookToView'> = ( state ) => state.requestFormReducer.bookToView
export const getApiError: RequestFormSelectors<'apiError'> = ( state ) => state.requestFormReducer.apiError

// // выборка из списка загруженных книг (пока отключил) - загружаю каждую книгу напрямую из API
// export const getOneBookFromLocal = createSelector( getBooksList, getBookToView,
//     ( booksList, bookToView ): ItemBook['volumeInfo'] | undefined => {
//         return booksList.filter( ( book ) => book.id === bookToView.bookId )[0]?.volumeInfo
//     } )
