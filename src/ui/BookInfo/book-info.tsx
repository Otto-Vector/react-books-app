import React, { useEffect } from 'react'
import classes from './book-info.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../common/Button/Button'
import anyBookImage from '../../images/AnyBook.jpg'
import { getBookToView, getTotalBooksNumber } from '../../selectors/request-form-selectors'
import { getOneBookFromApi, requestFormActions } from '../../redux/request-form-reducer'
import { removeAllHTMLTags } from '../../utils/utils'
import { MaterialIcon } from '../common/MaterialIcon/MaterialIcon'
import { BookPreShadow } from './book-pre-shadow'


// здесь буду специально использовать хуки
export const BookInfo: React.FC = () => {

    const dispatch = useDispatch()
    // вытаскиваем значение роутера
    const { bookId } = useParams<{ bookId: string | undefined }>()
    const { foundedBook } = useSelector( getBookToView )

    // для кнопки "назад" если мы зашли не из списка, то некуда возвращаться
    const totalBooks = useSelector( getTotalBooksNumber )
    // для кнопки "назад"
    const navigate = useNavigate()

    useEffect( () => {
        if (foundedBook?.id !== bookId) { // избавляемся от лишнего просмотра, если книга та же самая
            // назначаем id книги в стэйт (для дальнейшего сравнения)
            dispatch( requestFormActions.setBookIdToView( bookId ) )
            // запрашиваем книгу из API
            dispatch( getOneBookFromApi( bookId || 'test' ) )
        }
    }, [ bookId, foundedBook?.id, dispatch ] )

    // предзагрузочная форма при обновлении запроса
    if (foundedBook === null || foundedBook.id !== bookId) return <BookPreShadow/>
    else {
        const {
            volumeInfo: {
                imageLinks,
                categories,
                title,
                authors,
                description,
                previewLink,
            },
        } = foundedBook
        return (<div className={ classes.container }>
                <div className={ classes.side }>
                    <img className={ classes.image } alt={ 'bookName' }
                         src={ imageLinks?.thumbnail || imageLinks?.smallThumbnail || anyBookImage }/>
                </div>
                <div className={ classes.side }>
                    <p className={ classes.category }>{ categories.join(' / ') }</p>
                    <h2 className={ classes.bookName } title={ 'Book header' }>{ title }</h2>
                    <article className={ classes.authors } title={ 'Authors' }>{ authors.join(' | ') }</article>
                    <p className={ classes.description }>{ removeAllHTMLTags( description ) }</p>

                    <div className={ classes.buttonsPanel }>
                        <a href={ previewLink }
                           target="_blank" rel="noopener noreferrer"
                           role={ 'button' }>
                            <Button disabled={ !previewLink }
                                    mode={ 'White' }
                                    title={ 'Read in Google' }
                            >
                                <MaterialIcon icon_name={ 'menu_book' }/>{ ' Read' }</Button>
                        </a>
                        < Button disabled={ totalBooks <= 0 }
                                 mode={ 'LightBlue' }
                                 title={ 'Go back' }
                                 onClick={ () => navigate( -1 ) }
                        >
                            <MaterialIcon icon_name={ 'reply' }/>{ ' To List' }</Button>
                    </div>
                </div>
            </div>
        )
    }
}
