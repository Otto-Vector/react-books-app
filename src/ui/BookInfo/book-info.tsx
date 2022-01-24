import React, { useEffect, useState } from 'react'
import classes from './book-info.module.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../common/Button/Button'
import anyBookImage from '../../images/AnyBook.jpg'
import { getBooksList, getOneBookFromLocal } from '../../selectors/request-form-selectors'
import { requestFormActions } from '../../redux/request-form-reducer'

// здесь буду специально использовать хуки
export const BookInfo: React.FC = () => {
    const dispatch = useDispatch()
    // вытаскиваем значение роутера
    const { bookId } = useParams<{ bookId: string | undefined }>()
    const books = useSelector( getBooksList )
    const [ {
        imageLinks,
        categories,
        title,
        authors,
        description,
        previewLink,
    }, setBook ] = useState( books[0].volumeInfo )

    const bookFromFilter = useSelector( getOneBookFromLocal )

    useEffect( () => {
        dispatch( requestFormActions.setBookIdToView( bookId ) )
        setBook( bookFromFilter ?? books[0].volumeInfo )
    }, [ bookId ] )


    return (<div className={ classes.container }>
            <div className={ classes.side }>
                <img className={ classes.image } alt={ 'bookName' }
                     src={ imageLinks?.thumbnail || imageLinks?.smallThumbnail || anyBookImage }/>
            </div>
            <div className={ classes.side }>
                <div className={ classes.category }>{ categories }</div>
                <div className={ classes.bookName }>{ title }</div>
                <p className={ classes.authors }>{ authors }</p>
                <p className={ classes.authors }>{ description }</p>
                <Button disabled={ !previewLink } mode={ 'Gray' } title={ 'read in google' }>
                    <a href={ previewLink } target="_blank" rel="noopener noreferrer">Read</a>
                </Button>
            </div>
        </div>
    )
}
