import { ThunkAction } from 'redux-thunk'
import { AppStateType, GetActionsTypes } from './redux-store'
import { BooksRequest, ItemBook, PaginationType } from '../types/books-api-types'
import { getBooksFromApi, getOneBookOverIdFromApi } from '../api/books-api'
import { BookInfoType, initialBook } from './initial-book'

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
    bookToView: {
        bookId: undefined as undefined | string,
        foundedBook: initialBook,
    },
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
    setFoundedBook: ( foundedBook: BookInfoType ) => ({
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
        const response = await getOneBookOverIdFromApi( bookId )
        if (response.hasOwnProperty('error') ) {
            alert('НЕ НАЙДЕНО КНИГ ПО ДАННОМУ iD: '+bookId)
        } else {
            dispatch( requestFormActions.setFoundedBook( response as BookInfoType) )
        }
    }
export default requestFormReducer
