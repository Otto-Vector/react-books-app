import { ThunkAction } from 'redux-thunk'
import { AppStateType, GetActionsTypes } from './redux-store'
import { BooksRequest, ItemBook, PaginationType } from '../types/books-api-types'
import { getBooksFromApi } from '../api/books-api'

const initialState = {
    books: [] as ItemBook[],
    totalBooks: 0,
    isFetching: false,
    pagination: {
        maxResults: 30, //максимум - 40
        startIndex: 0,
    } as PaginationType,
    request: {
        orderBy: 'relevance',
        categories: 'all',
        bookName: '',
    } as BooksRequest,
    selectProps: {
        categories: [ 'all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry' ],
        orderBy: [ 'relevance', 'newest' ],
    },
}

export type requestFormReducerStateType = typeof initialState

type ActionsType = GetActionsTypes<typeof requestFormActions>

const requestFormReducer = ( state = initialState, action: ActionsType ): requestFormReducerStateType => {

    switch (action.type) {

        case 'request-form-reducer/TOGGLE-IS-FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        case 'request-form-reducer/SET-BOOKS': {
            return {
                ...state,
                books: action.books.length === 0 ? [] : [ ...state.books, ...action.books ],
            }
        }
        case 'request-form-reducer/SET-TOTAL-BOOKS-COUNT': {
            return {
                ...state,
                totalBooks: action.totalBooks,
            }
        }
        case 'request-form-reducer/NEXT-INDEX': {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    startIndex: action.startIndex,
                },
            }
        }
        case 'request-form-reducer/SAVE-REQUEST': {
            return {
                ...state,
                request: action.request,
            }
        }
        default: {
            return state
        }
    }

}

/* ЭКШОНЫ USERS */

export const requestFormActions = {
    // установка значения в карточки пользователей одной страницы
    setBooks: ( books: ItemBook[] ) => ({
        type: 'request-form-reducer/SET-BOOKS',
        books,
    } as const),
    // выставляет значение всего найденных книг
    setTotalBooksCount: ( totalBooks: number ) => ({
        type: 'request-form-reducer/SET-TOTAL-BOOKS-COUNT',
        totalBooks,
    } as const),
    // ожидание отклика API на запрос поиска пользователей
    toggleIsFetching: ( isFetching: boolean ) => ({
        type: 'request-form-reducer/TOGGLE-IS-FETCHING',
        isFetching,
    } as const),
    // с какого ИНДЕКСА отображать страницы
    nextIndex: ( startIndex: number ) => ({
        type: 'request-form-reducer/NEXT-INDEX',
        startIndex,
    } as const),
    // сохранить данные запроса
    saveRequest: ( request: BooksRequest ) => ({
        type: 'request-form-reducer/SAVE-REQUEST',
        request,
    } as const),
}

/* САНКИ */

export type UsersReducerThunkActionType<R = void> = ThunkAction<Promise<R>, AppStateType, unknown, ActionsType>

// запрос на API и запись в стейт значений поиска книг
export const getBooks = ( searchForm: BooksRequest,
                          pagination: PaginationType ): UsersReducerThunkActionType =>
    async ( dispatch, getState ) => {
        // отображение статуса обработки запроса
        dispatch( requestFormActions.toggleIsFetching( true ) )

        // если запрос передан, то сохраняем его в state
        if (searchForm) dispatch( requestFormActions.saveRequest( searchForm ) )
        // если смотрим с нулевой страницы, зануляем список загруженных книг
        if (pagination.startIndex === 0) {
            dispatch( requestFormActions.setBooks( [] ) )
            dispatch( requestFormActions.nextIndex( 0 ) )
        }

        try {
            const response = await getBooksFromApi( getState().requestFormReducer.request, pagination )
            dispatch( requestFormActions.setBooks( response.items ) )
            dispatch( requestFormActions.setTotalBooksCount( response.totalItems ) )
        } catch (e) {
            alert( 'Error from API is: ' + e )
            // console.log( 'Error from API is: ', e )
            // debugger;
        }
        // окончание отображение статуса обработки запроса
        dispatch( requestFormActions.toggleIsFetching( false ) )
    }


export default requestFormReducer
