import React, { useEffect } from 'react'
import classes from './book-info.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../common/Button/Button'
import anyBookImage from '../../images/AnyBook.jpg'
import { getBooksList, getBookToView, getTotalBooksNumber } from '../../selectors/request-form-selectors'
import { getOneBookFromApi, requestFormActions } from '../../redux/request-form-reducer'

// здесь буду специально использовать хуки
export const BookInfo: React.FC = () => {

    const dispatch = useDispatch()
    // вытаскиваем значение роутера
    const { bookId } = useParams<{ bookId: string | undefined }>()
    // значение найденной книги
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

    // для кнопки "назад" если мы зашли не из списка, то некуда возвращаться
    const hasBooks = useSelector( getTotalBooksNumber )
    // для кнопки "назад"
    const navigate = useNavigate()

    useEffect( () => {
        // назначаем id книги в стэйт, пока просто так, в дальнейшем пригодится
        dispatch( requestFormActions.setBookIdToView( bookId ) )
        // запрашиваем книгу из API
        dispatch( getOneBookFromApi( bookId || 'test' ) )
    }, [] )


    return (<div className={ classes.container }>
            <div className={ classes.side }>
                <img className={ classes.image } alt={ 'bookName' }
                     src={ imageLinks?.small || imageLinks?.thumbnail || anyBookImage }/>
            </div>
            <div className={ classes.side }>
                <div className={ classes.category }>{ categories }</div>
                <div className={ classes.bookName }>{ title }</div>
                <p className={ classes.authors }>{ authors }</p>
                <p className={ classes.authors }>{ description }</p>
                <Button disabled={ !previewLink }
                        mode={ 'Gray' }
                        title={ 'read in google' }
                >
                    <a href={ previewLink } target="_blank" rel="noopener noreferrer">Read</a>
                </Button>
                <Button disabled={ !hasBooks }
                        mode={ 'Pink' }
                        title={ 'Go back' }
                        onClick={ () => navigate( -1 ) }
                >Back to List</Button>
            </div>
        </div>
    )
}
