import { ThunkAction } from 'redux-thunk'
import { AppStateType, GetActionsTypes } from './redux-store'
import { BooksRequest, itemBook, PaginationType } from '../types/books-api-types'
import { getBooksFromApi } from '../api/books-api'

const initialState = {
    books: [] as itemBook[],
    totalBooks: 0,
    isFetching: false,
    booksToView: 30, //максимум - 40
    startIndex: 0,
    request: {} as BooksRequest,
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
            let books = (state.startIndex === 0) ? action.books : [ ...state.books, ...action.books ]
            return {
                ...state,
                books: (books === undefined) ? [] : books,
            }
        }
        case 'request-form-reducer/SET-TOTAL-BOOKS-COUNT': {
            return {
                ...state,
                totalBooks: action.totalBooks,
            }
        }
        case 'request-form-reducer/NEXT-PAGE': {
            return {
                ...state,
                startIndex: action.startIndex,
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
    setBooks: ( books: itemBook[] ) => ({
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
    // смена номера отображаемой страницы
    nextPage: ( startIndex: number ) => ({
        type: 'request-form-reducer/NEXT-PAGE',
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
export const getBooks = ( searchForm?: BooksRequest ): UsersReducerThunkActionType =>
    async ( dispatch, getState ) => {
        // отображение статуса обработки запроса
        dispatch( requestFormActions.toggleIsFetching( true ) )
        // запрашиваем и собираем в объект данные активных страниц
        const pagination: PaginationType = {
            startIndex: getState().requestFormReducer.startIndex,
            maxResults: getState().requestFormReducer.booksToView,
        }
        // если запрос передан, то сохраняем его в state
        if (searchForm) dispatch( requestFormActions.saveRequest( searchForm ) )
        // если смотрим с нулевой страницы, зануляем список загруженных книг
        if (pagination.startIndex === 0) dispatch( requestFormActions.setBooks( [] ) )

        try {
            const response = await getBooksFromApi( getState().requestFormReducer.request, pagination )
            dispatch( requestFormActions.setBooks( response.items ) )
            dispatch( requestFormActions.setTotalBooksCount( response.totalItems ) )
        } catch (e) {
            alert( 'Error from API is: ' + e )
        }
        // окончание отображение статуса обработки запроса
        dispatch( requestFormActions.toggleIsFetching( false ) )
    }


export default requestFormReducer
