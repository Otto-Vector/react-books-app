import React from 'react';
import {connect} from "react-redux";

import {AppStateType} from "../../redux/redux-store";
import {itemBook} from "../../types/books-api-types";
// import {getBooks} from "../../redux/request-form-reducer";
import Counter from "./Counter/Counter";
import Preloader from "../common/preloader/Preloader";

type MapStatePropsType = {
  books: itemBook[]
  isFetching: boolean
  totalBooks: number
  booksToView: number
}

type MapDispatchType = {
  // getBooks: (bookName: string, categories: CategoriesType, sortingBy: SortingByType) => void
}

type OwnProps = {}

type BooksContainerType = MapStatePropsType & MapDispatchType & OwnProps

const BooksContainer: React.FC<BooksContainerType> = (
  { books, totalBooks, booksToView, isFetching}) => {

  return (<div>
      <Counter totalBooks={ totalBooks }/>
      { isFetching && <Preloader/> }
    </div>
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    books: state.requestFormReducer.books,
    isFetching: state.requestFormReducer.isFetching,
    totalBooks: state.requestFormReducer.totalBooks,
    booksToView: state.requestFormReducer.booksToView
  }
}


export default connect<MapStatePropsType, MapDispatchType, OwnProps, AppStateType>(mapStateToProps, {
  // getBooks
})(BooksContainer)
