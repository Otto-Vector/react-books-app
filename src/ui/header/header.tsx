import React from 'react';
import classes from './header.module.scss'
import bgBooks from "../../images/bg_books.jpg";
import {InputForm} from "../input-form/input-form";
import SearchForm from "./search-form/search-form";
import {BooksRequest} from "../../types/books-api-types";
import {getBooks} from "../../redux/request-form-reducer";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";

const headerStyle: React.CSSProperties = {
    "backgroundImage": `linear-gradient(90deg, #00000020, #00000080), url(${ bgBooks })`
    // "backgroundImage": `linear-gradient(90deg, #00000020, #00000080), url('../../images/bg_books.jpg')`
}

type MapStatePropsType = {
    isFetching: boolean
}

type MapDispatchType = {
  getBooks: (searchForm: BooksRequest) => void
}

type OwnProps = {}

type HeaderContainerType = MapStatePropsType & MapDispatchType & OwnProps

const Header: React.FC<HeaderContainerType> = ({getBooks}) => {
    let headerText = 'Search for books'
    let onSubmit = async (searchForm:BooksRequest)=> {
        await getBooks(searchForm)
    }
        return (
        <header style={ headerStyle } className={ classes.header }>
            <h1 className={ classes.head }>{ headerText }</h1>
            <div className={ classes.inputForm}>
                <InputForm/>
                <SearchForm onSubmit={onSubmit}/>
            </div>
        </header>
    );
}



const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
      isFetching: state.requestFormReducer.isFetching
  }
}

export default connect<MapStatePropsType, MapDispatchType, OwnProps, AppStateType>(mapStateToProps, {
  getBooks})(Header)
