import { ThunkAction } from 'redux-thunk'
import { AppStateType, GetActionsTypes } from './redux-store'
import { BooksRequest, ItemBook, PaginationType } from '../types/books-api-types'
import { getBooksFromApi, getOneBookOverIdFromApi } from '../api/books-api'
import { BookInfoType } from './initial-book'

const initialState = {
    books: [] as ItemBook[],
    totalBooks: -1, // минус один, чтобы до первого поиска не отображалось количество найденных книг равное нулю
    isFetching: false,
    pagination: { // запрос на количество книг
        maxResults: 30, // максимум - 40
        startIndex: 0,
    } as PaginationType,
    request: { // сам запрос на книгу
        orderBy: 'relevance',
        categories: 'all',
        bookName: '',
    } as BooksRequest,
    selectProps: { // параметры выбора в селекторах
        categories: [ 'all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry' ],
        orderBy: [ 'relevance', 'newest' ],
    },
    bookToView: {
        bookId: undefined as undefined | string,
        foundedBook: null as BookInfoType | null,
    },
    apiError: null as null | string,
}

export type RequestFormReducerStateType = typeof initialState

type ActionsType = GetActionsTypes<typeof requestFormActions>

const requestFormReducer = ( state = initialState, action: ActionsType ): RequestFormReducerStateType => {

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
                books: [ ...state.books, ...(action.books ?? []) ],
            }
        }
        case 'request-form-reducer/CLEAR-BOOKS-LIST': {
            return {
                ...state,
                books: [],
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
        case 'request-form-reducer/SET-BOOK-ID-TO-VIEW': {
            return {
                ...state,
                bookToView: {
                    ...state.bookToView,
                    bookId: action.bookId,
                },
            }
        }
        case 'request-form-reducer/SET-FOUNDED-BOOK-TO-VIEW': {
            return {
                ...state,
                bookToView: {
                    ...state.bookToView,
                    foundedBook: action.foundedBook,
                },
            }
        }
        case 'request-form-reducer/SAVE-API-ERROR': {
            return {
                ...state,
                apiError: action.error,
            }
        }
        default: {
            return state
        }
    }

}

// toDo: навести порядок в экшонах
/* ЭКШОНЫ BOOKS */
export const requestFormActions = {
    // установка значения в карточки пользователей одной страницы
    setBooks: ( books: ItemBook[] | undefined ) => ({
        type: 'request-form-reducer/SET-BOOKS',
        books,
    } as const),
    clearBooksList: () => ({
        type: 'request-form-reducer/CLEAR-BOOKS-LIST',
    } as const),
    // выставляет значение всего найденных книг
    setTotalBooksCount: ( totalBooks: number ) => ({
        type: 'request-form-reducer/SET-TOTAL-BOOKS-COUNT',
        totalBooks,
    } as const),
    setBookIdToView: ( bookId: string | undefined ) => ({
        type: 'request-form-reducer/SET-BOOK-ID-TO-VIEW',
        bookId,
    } as const),
    setFoundedBook: ( foundedBook: BookInfoType | null ) => ({
        type: 'request-form-reducer/SET-FOUNDED-BOOK-TO-VIEW',
        foundedBook,
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
    // ошибка сервера
    setApiError: ( error: string | null ) => ({
        type: 'request-form-reducer/SAVE-API-ERROR',
        error,
    } as const),
}

/* САНКИ */

export type UsersReducerThunkActionType<R = void> = ThunkAction<Promise<R>, AppStateType, unknown, ActionsType>

// запрос на API и запись в стейт значений поиска книг
export const getBooks = ( searchForm: BooksRequest,
                          pagination: PaginationType ): UsersReducerThunkActionType =>
    async ( dispatch ) => {
        // отображение статуса обработки запроса
        dispatch( requestFormActions.toggleIsFetching( true ) )
        try {
            const response = await getBooksFromApi( searchForm, pagination )
            dispatch( requestFormActions.setBooks( response.items ) )
            dispatch( requestFormActions.setTotalBooksCount( response.totalItems ) )
        } catch (e) {
            alert( 'Error from Thunk is: ' + e )
        }
        // окончание отображение статуса обработки запроса
        dispatch( requestFormActions.toggleIsFetching( false ) )
    }

export const getOneBookFromApi = ( bookId: string ): UsersReducerThunkActionType =>
    async ( dispatch ) => {
        dispatch( requestFormActions.setApiError( null ) )
        try {
            const response = await getOneBookOverIdFromApi( bookId )
            dispatch( requestFormActions.setFoundedBook( response as BookInfoType ) )
        } catch (e) {
            dispatch( requestFormActions.setApiError( `Not found book with id: ${ bookId } ` ) )
        }

    }
export default requestFormReducer
