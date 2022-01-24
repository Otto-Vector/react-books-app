import React, { useEffect, useState } from 'react'
import classes from './book-info.module.scss'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { ItemBook } from '../../types/books-api-types'


// здесь буду специально использовать хуки
export const BookInfo: React.FC = () => {
    // вытаскиваем значение роутера
    const { bookId } = useParams<{ bookId: string }>()
    const books = useSelector( ( state: AppStateType ) => state.requestFormReducer.books )
    const [ { imageLinks, categories, title, authors, description }, setBook ] = useState( books[0].volumeInfo )

    const localBookById = (): ItemBook['volumeInfo'] => {
        return books.filter( ( item ) => item.id === bookId )[0].volumeInfo
    }

    useEffect( () => {
        setBook( localBookById() )
        console.log(books)
    }, [] )

    return (<div className={ classes.container }>
            <div className={ classes.side }>
                <img className={ classes.image } alt={ 'bookName' } src={ imageLinks.thumbnail }/>
            </div>
            <div className={ classes.side }>
                <div className={ classes.category }>{ categories }</div>
                <div className={ classes.bookName }>{ title }</div>
                <p className={ classes.authors }>{ authors }</p>
                <p className={ classes.authors }>{ description }</p>
            </div>
        </div>
    )
}
