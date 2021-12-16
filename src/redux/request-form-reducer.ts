import {ThunkAction} from "redux-thunk";
import {AppStateType, GetActionsTypes} from "./redux-store";
import {BooksRequest, itemBook, PaginationType} from "../types/books-api-types";
import {getBooksFromApi} from "../api/books-api";


const initialState = {
  books: [] as itemBook[],
  totalBooks: 0,
  isFetching: true,
  booksToView: 10, //максимум - 40
  startIndex: 0
}

export type requestFormReducerStateType = typeof initialState

type ActionsType = GetActionsTypes<typeof usersActions>

const requestFormReducer = (state = initialState, action: ActionsType): requestFormReducerStateType => {

  switch (action.type) {

    case "request-form-reducer/TOGGLE-IS-FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case "request-form-reducer/SET-BOOKS": {
      return {
        ...state,
        books: action.books
      }
    }
    case "request-form-reducer/SET-TOTAL-BOOKS-COUNT": {
      return {
        ...state,
        totalBooks: action.totalBooks
      }
    }

    default: {
      return state
    }
  }

}

/* ЭКШОНЫ USERS */

export const usersActions = {

  // установка значения в карточки пользователей одной страницы
  setBooks: (books: itemBook[]) => ({
    type: 'request-form-reducer/SET-BOOKS',
    books
  } as const),
  // выставляет значение всего найденных книг
  setTotalBooksCount: (totalBooks: number) => ({
    type: 'request-form-reducer/SET-TOTAL-BOOKS-COUNT',
    totalBooks
  } as const),
  // ожидание отклика API на запрос поиска пользователей
  toggleIsFetching: (isFetching: boolean) => ({
    type: 'request-form-reducer/TOGGLE-IS-FETCHING',
    isFetching
  } as const),
  nextPage: (startIndex: number) => ({
    type: 'request-form-reducer/NEXT-PAGE',
    startIndex
  } as const),
}

/* САНКИ */

export type UsersReducerThunkActionType<R = void> = ThunkAction<Promise<R>, AppStateType, unknown, ActionsType>

// запрос на API и запись в стейт значений поиска книг
export const getBooks = (searchForm: BooksRequest): UsersReducerThunkActionType =>
  async (dispatch,getState) => {

    dispatch(usersActions.toggleIsFetching(true))

    let pagination: PaginationType = {
      startIndex: getState().requestFormReducer.startIndex,
      maxResults: getState().requestFormReducer.booksToView
    }

    const response = await getBooksFromApi(searchForm,pagination)

    dispatch(usersActions.setBooks(response.items))

    dispatch(usersActions.setTotalBooksCount(response.totalItems))

    dispatch(usersActions.toggleIsFetching(false))
  }


export default requestFormReducer
