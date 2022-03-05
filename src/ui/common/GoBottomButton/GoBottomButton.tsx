import React, { useEffect, useState } from 'react'
import styles from './go-bottom-button.module.scss'

export const GoBottomButton: React.FC = () => {

    const [ showGoTop, setShowGoTop ] = useState( false )

    const handleVisibleButton = () => {
        setShowGoTop( window.pageYOffset > 50 )
    }

    const handleScrollUp = () => {
        window.scrollTo( { left: 0, top: 10000000, behavior: 'smooth' } )
    }

    useEffect( () => {
        window.addEventListener( 'scroll', handleVisibleButton )
    },[] )

    return (
        <div className={ showGoTop ? '' : styles.goBottomHidden } onClick={ handleScrollUp }>
            <button type={'button'} className={ styles.goTop }>
                <span className={ styles.goBottomIcon }>expand_more</span>
            </button>
        </div>
    )
}

