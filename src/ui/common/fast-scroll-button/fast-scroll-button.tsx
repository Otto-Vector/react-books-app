import React, { useEffect, useState } from 'react'
import styles from './fast-scroll-button.module.scss'

type OwnProps = {
    mode: 'top' | 'bottom',
    title?: string,
}

export const FastScrollButton: React.FC<OwnProps> = (
    {
        mode, // два режима "вверх" и вниз
        title, // описание кнопки при наведении курсора мыши
    } ) => {

    const [ showGoTop, setShowGoTop ] = useState( false )

    const handleVisibleButton = () => { // кнопка визуализируется при возможности прокрутки вниз
        setShowGoTop( window.pageYOffset > 50 )
    }

    const handleScrollUp = () => { // куда необходимо скроллиться при нажатии на кнопку
        window.scrollTo( { left: 0, top: (mode === 'top' ? 0 : 10000000), behavior: 'smooth' } )
    }

    useEffect( () => { // реализация визуализации кнопки
        window.addEventListener( 'scroll', handleVisibleButton )
        // отписка от события
        return () => window.removeEventListener( 'scroll', handleVisibleButton )
    }, [] )

    return (
        <button type={ 'button' }
                className={ styles.scrollButton + ' ' + (showGoTop ? '' : styles.scrollButtonHidden) }
                title={ title || `Go ${ mode }` }
                onClick={ handleScrollUp }
        >
                <span className={ styles.scrollButtonIcon }>{
                    `expand_${ mode === 'top' ? 'less' : 'more' }`
                }
                </span>
        </button>
    )
}
