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
import { PreloaderBar } from '../common/PreloaderBar/PreloaderBar'

export const BookPreview: React.FC = () => {
    return (<div className={ classes.container }>
            <div className={ classes.side }>
                <img className={ classes.image } alt={ 'emptyPreloader' }
                     src={ anyBookImage }/>
            </div>
            <div className={ classes.side }>
                <p className={ classes.category } style={ { width: '50%' } }>
                    <PreloaderBar height={ '1.8rem' }/>
                </p>
                <h2 className={ classes.bookName } style={ { width: '50%' } }>
                    <PreloaderBar height={ '2.25rem' }/>
                </h2>
                <article className={ classes.authors } style={ { width: '50%' } }>
                    <PreloaderBar height={ '1.8rem' }/>
                </article>
                <p className={ classes.description }>
                    {
                        [ ...Array( 8 ) ]
                            .map( ( e, i ) =>
                                <PreloaderBar key={ i } height={ '1.7rem' }/> )
                    }

                </p>

                <div className={ classes.buttonsPanel }>
                    <Button disabled={ true }
                            mode={ 'Gray' }
                            title={ 'PreButton' }
                    >
                        <div style={ { width: '5rem' } }><PreloaderBar/></div>
                    </Button>
                    < Button disabled={ true }
                             mode={ 'Pink' }
                             title={ 'PreButton' }
                    >
                        <div style={ { width: '5rem' } }><PreloaderBar/></div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

// здесь буду специально использовать хуки
export const BookInfo: React.FC = () => {

    const dispatch = useDispatch()
    // вытаскиваем значение роутера
    const { bookId } = useParams<{ bookId: string | undefined }>()
    // значение найденной книги
    const {
        foundedBook: {
            volumeInfo: {
                imageLinks = { thumbnail: '', smallThumbnail: '' },
                categories = [ '' ],
                title = '',
                authors = [ '' ],
                description = '',
                previewLink = '',
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
                     src={ imageLinks?.thumbnail || imageLinks?.smallThumbnail || anyBookImage }/>
            </div>
            <div className={ classes.side }>
                <p className={ classes.category }>{ categories }</p>
                <h2 className={ classes.bookName }>{ title }</h2>
                <article className={ classes.authors }>{ authors }</article>
                <p className={ classes.description }>{ removeAllHTMLTags( description ) }</p>

                <div className={ classes.buttonsPanel }>
                    <a href={ previewLink }
                       target="_blank" rel="noopener noreferrer"
                       role={ 'button' }>
                        <Button disabled={ !previewLink }
                                mode={ 'Gray' }
                                title={ 'Read in Google' }
                        >
                            <MaterialIcon icon_name={ 'menu_book' }/>{ ' Read' }</Button>
                    </a>
                    < Button disabled={ !hasBooks }
                             mode={ 'Pink' }
                             title={ 'Go back' }
                             onClick={ () => navigate( -1 ) }
                    >
                        Back to List</Button>
                </div>
            </div>
        </div>
    )
}
