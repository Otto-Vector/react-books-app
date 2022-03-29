import React from 'react'
import classes from './header.module.scss'
import bgBooks2 from '../../images/bg-books2.jpg'
import { SearchForm } from './search-form/search-form'
import { getBooks, requestFormActions } from '../../redux/request-form-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPagination } from '../../selectors/request-form-selectors'
import { BooksRequest } from '../../types/books-api-types'


const headerStyle: React.CSSProperties = {
    // вставил так, пока не знаю как правильно воткнуть ссылку на картинку в bg
    'backgroundImage': `linear-gradient(0deg, #00000080, #00000020, #00000080), url(${ bgBooks2 })`,
}

type OwnProps = {}

export const Header: React.FC<OwnProps> = () => {

    const headerText = 'Search for books:' // захардкодил название
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pagination = useSelector( getPagination )

    // для формы ввода
    const onSubmit = ( searchForm: BooksRequest ) => {
        // возвращаем на страницу поиска
        navigate( '/search' )
        // возвращаем на нулевой индеск
        dispatch( requestFormActions.nextIndex( 0 ) )
        // очищаем список книг
        dispatch( requestFormActions.clearBooksList() )
        // сохраняем данные запроса
        dispatch( requestFormActions.saveRequest( searchForm ) )
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

