// import { createSelector } from 'reselect'
import { AppStateType } from '../redux/redux-store'
import { requestFormReducerStateType } from '../redux/request-form-reducer'

type RequestFormSelectors<T extends keyof Y, Y = requestFormReducerStateType> = ( state: AppStateType ) => Y[T]

export const getIsFetching: RequestFormSelectors<'isFetching'> = ( state ) => state.requestFormReducer.isFetching
export const getBooksList: RequestFormSelectors<'books'> = ( state ) => state.requestFormReducer.books
export const getRequestBooks: RequestFormSelectors<'request'> = ( state ) => state.requestFormReducer.request
export const getPagination: RequestFormSelectors<'pagination'> = ( state ) => state.requestFormReducer.pagination
export const getTotalBooksNumber: RequestFormSelectors<'totalBooks'> = ( state ) => state.requestFormReducer.totalBooks

// export const getAuthorizedUserDataId = createSelector( getAuthorizedUserData,
//     ( authorizedUserData: AuthDataType ): AuthDataType['id'] => {
//         return authorizedUserData.id
//     } )
