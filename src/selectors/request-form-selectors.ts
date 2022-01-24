// import { createSelector } from 'reselect'
import { AppStateType } from '../redux/redux-store'
import { requestFormReducerStateType } from '../redux/request-form-reducer'

type RequestFormSelectors<T extends keyof Y, Y = requestFormReducerStateType> = ( state: AppStateType ) => Y[T]

export const getBooksList: RequestFormSelectors<'books'> = ( state ) => state.requestFormReducer.books
export const getRequestBooks: RequestFormSelectors<'request'> = ( state ) => state.requestFormReducer.request
export const getPagination: RequestFormSelectors<'pagination'> = ( state ) => state.requestFormReducer.pagination

// export const getAuthorizedUserDataId = createSelector( getAuthorizedUserData,
//     ( authorizedUserData: AuthDataType ): AuthDataType['id'] => {
//         return authorizedUserData.id
//     } )
