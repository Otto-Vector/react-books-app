import React, { useEffect, useState } from 'react'
import styles from './GoToScrollButton.module.scss'

type OwnProps = {
    isGoTop: boolean,
    isLeft: boolean,
    title?: string,
}

export const GoToScrollButton: React.FC<OwnProps> = (
    {
        isGoTop, // два режима "вверх" и вниз
        isLeft, // вручную хардкодим правый или левый "прилип"
        title, // описание кнопки при наведении курсора мыши
    } ) => {

    const [ showGoTop, setShowGoTop ] = useState( false )

    const handleVisibleButton = () => { // кнопка визуализируется при возможности прокрутки вниз
        setShowGoTop( window.pageYOffset > 50 )
    }

    const handleScrollUp = () => { // куда необходимо скроллиться при нажатии на кнопку
        window.scrollTo( { left: 0, top: (isGoTop ? 0 : 10000000), behavior: 'smooth' } )
    }

    useEffect( () => { // реализация визуализации кнопки
        window.addEventListener( 'scroll', handleVisibleButton )
    }, [] )

    return (
        <div className={ showGoTop ? '' : styles.goTopHidden } onClick={ handleScrollUp }>
            <button type={ 'button' } className={ styles.goTop }
                    title={ title || (isGoTop ? 'GoTop' : 'GoBottom') }
            >
                <span
                    className={ styles.goTopIcon + ' ' + (isLeft ? styles.goTopIconLeft : styles.goTopIconRight) }
                >{ `expand_${ isGoTop ? 'less' : 'more' }` }</span>
            </button>
        </div>
    )
}
