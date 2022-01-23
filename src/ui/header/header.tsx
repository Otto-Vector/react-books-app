import React from 'react'
import classes from './header.module.scss'
import bgBooks from '../../images/bg_books.jpg'
import SearchForm from './search-form/search-form'
import { BooksRequest } from '../../types/books-api-types'
import { getBooks, requestFormActions } from '../../redux/request-form-reducer'
import { AppStateType } from '../../redux/redux-store'
import { connect } from 'react-redux'
import { useNavigate  } from 'react-router-dom'

const headerStyle: React.CSSProperties = {
    // вставил так, пока не знаю как правильно воткнуть ссылку на картинку в bg
    'backgroundImage': `linear-gradient(90deg, #00000020, #00000080), url(${ bgBooks })`,
}

type MapStatePropsType = {
    isFetching: boolean
}

type MapDispatchType = {
    getBooks: ( searchForm: BooksRequest ) => void
    nextPage: ( startIndex: number ) => void
}

type OwnProps = {}

type HeaderContainerType = MapStatePropsType & MapDispatchType & OwnProps

const Header: React.FC<HeaderContainerType> = ( { getBooks, nextPage } ) => {

    const headerText = 'Search for books' // захардкодил название
    const navigate = useNavigate()

    const onSubmit = async ( searchForm: BooksRequest ) => {
        // возвращаем на страницу поиска
        navigate('/search')
        // возвращаем на нулевой индеск
        await nextPage( 0 )
        // отправляем запрос
        await getBooks( searchForm )
    }
    return (
        <header style={ headerStyle } className={ classes.header }>
            <h1 className={ classes.head }>{ headerText }</h1>
            <div className={ classes.inputForm }>
                <SearchForm onSubmit={ onSubmit }/>
            </div>
        </header>
    )
}


const mapStateToProps = ( state: AppStateType ): MapStatePropsType => {
    return {
        isFetching: state.requestFormReducer.isFetching,
    }
}

const { nextPage } = requestFormActions
export default connect<MapStatePropsType, MapDispatchType, OwnProps, AppStateType>( mapStateToProps, {
    getBooks,
    nextPage,
} )( Header )
