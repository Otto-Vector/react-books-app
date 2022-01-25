import React, { useEffect } from 'react'
import classes from './book-info.module.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../common/Button/Button'
import anyBookImage from '../../images/AnyBook.jpg'
import { getBookToView } from '../../selectors/request-form-selectors'
import { getOneBookFromApi, requestFormActions } from '../../redux/request-form-reducer'

// здесь буду специально использовать хуки
export const BookInfo: React.FC = () => {

    const dispatch = useDispatch()
    // вытаскиваем значение роутера
    const { bookId } = useParams<{ bookId: string | undefined }>()

    const {
        foundedBook: {
            volumeInfo: {
                imageLinks,
                categories,
                title,
                authors,
                description,
                previewLink,
            },
        },
    } = useSelector( getBookToView )

    useEffect( () => {
        dispatch( requestFormActions.setBookIdToView( bookId ) )
        dispatch( getOneBookFromApi( bookId || 'test' ) )
    }, [] )

    // toDo: добавить кнопку "назад к списку"
    return (<div className={ classes.container }>
            <div className={ classes.side }>
                <img className={ classes.image } alt={ 'bookName' }
                     src={ imageLinks?.medium || imageLinks?.small || anyBookImage }/>
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
