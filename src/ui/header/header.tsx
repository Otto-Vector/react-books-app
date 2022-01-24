import React from 'react'
import classes from './header.module.scss'
import bgBooks from '../../images/bg_books.jpg'
import SearchForm from './search-form/search-form'
import { BooksRequest } from '../../types/books-api-types'
import { getBooks, requestFormActions } from '../../redux/request-form-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPagination } from '../../selectors/request-form-selectors'

const { setBooks, nextIndex, saveRequest } = requestFormActions

const headerStyle: React.CSSProperties = {
    // вставил так, пока не знаю как правильно воткнуть ссылку на картинку в bg
    'backgroundImage': `linear-gradient(90deg, #00000020, #00000080), url(${ bgBooks })`,
}

type OwnProps = {}

export const Header: React.FC<OwnProps> = () => {

    const headerText = 'Search for books' // захардкодил название
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pagination = useSelector( getPagination )

    const onSubmit = ( searchForm: BooksRequest ) => {
        // возвращаем на страницу поиска
        navigate( '/search' )
        // возвращаем на нулевой индеск
        dispatch( nextIndex( 0 ) )
        // очищаем список книг
        dispatch( setBooks( [] ) )
        // сохраняем данные запроса
        dispatch( saveRequest( searchForm ) )
        // отправляем запрос
        dispatch( getBooks( searchForm, { ...pagination, startIndex: 0 } ) )
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

