import React, { useEffect, useState } from 'react'
import classes from './book-info.module.scss'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { itemBook } from '../../types/books-api-types'


// здесь буду специально использовать хуки
export const BookInfo: React.FC = () => {
    // вытаскиваем значение роутера
    const { bookId } = useParams<{ bookId: string }>()
    const books = useSelector( ( state: AppStateType ) => state.requestFormReducer.books )
    const [ book, setBook ] = useState( books[0] )

    const localBookById = (): itemBook[] => {
        return books.filter( ( item ) => item.id === bookId )
    }
    useEffect( () => {
        setBook( localBookById()[0] )
    }, [] )

    return (<div className={ classes.container }>
            <div className={ classes.side }>
                <img className={ classes.image } alt={ 'bookName' } src={ book.volumeInfo.imageLinks.thumbnail }/>
            </div>
            <div className={ classes.side }>
                <div className={ classes.category }>{ book.volumeInfo.categories }</div>
                <div className={ classes.bookName }>{ book.volumeInfo.title }</div>
                <p className={ classes.authors }>{ book.volumeInfo.authors }</p>
                <p className={ classes.authors }>{ book.volumeInfo.description }</p>
            </div>
        </div>
    )
}
