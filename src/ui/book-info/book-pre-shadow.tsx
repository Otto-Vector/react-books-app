import React from 'react'
import classes from './book-info.module.scss'
import { Button } from '../common/button/button'
import anyBookImage from '../../images/open-book.png'
import { PreloaderBar } from '../common/preloader-bar/preloader-bar'
import { useSelector } from 'react-redux'
import { getApiError } from '../../selectors/request-form-selectors'


export const BookPreShadow: React.FC = () => {

    const apiError = useSelector( getApiError )

    return (<div className={ classes.container }>
            <div className={ classes.side }>
                <img className={ classes.image } alt={ 'emptyPreloader' }
                     src={ anyBookImage }/>
                <div style={ { color: 'red', fontWeight: 'bold' } }>{ apiError }</div>
            </div>
            <div className={ classes.side }>
                <div className={ classes.category } style={ { width: '70%' } }>
                    <PreloaderBar height={ '1.8rem' }/>
                </div>
                <h2 className={ classes.bookName } style={ { width: '50%' } }>
                    <PreloaderBar height={ '2.25rem' }/>
                </h2>
                <article className={ classes.authors } style={ { width: '60%' } }>
                    <PreloaderBar height={ '1.8rem' }/>
                </article>
                <div className={ classes.description }>
                    {
                        [ ...Array( 8 ) ]
                            .map( ( e, i ) =>
                                <PreloaderBar key={ i } height={ '1.7rem' }/> )
                    }
                </div>

                <div className={ classes.buttonsPanel }>
                    { [ 'Pink', 'Gray' ]
                        .map( ( e, i ) =>
                            <Button disabled={ true }
                                    key={ e + i }
                                    mode={ e as 'Pink' | 'Gray' }
                                    title={ 'PreButton' }
                            >
                                <div style={ { width: '5rem' } }>
                                    <PreloaderBar/>
                                </div>
                            </Button> )
                    }

                </div>
            </div>
        </div>
    )
}
