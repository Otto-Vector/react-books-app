import React, { useEffect, useState } from 'react'
import styles from './go-top-button.module.scss'

const GoTopButton: React.FC = () => {

    const [ showGoTop, setShowGoTop ] = useState( false )

    const handleVisibleButton = () => {
        setShowGoTop( window.pageYOffset > 50 )
    }

    const handleScrollUp = () => {
        window.scrollTo( { left: 0, top: 0, behavior: 'smooth' } )
    }

    useEffect( () => {
        window.addEventListener( 'scroll', handleVisibleButton )
    },[] )

    return (
        <div className={ showGoTop ? '' : styles.goTopHidden } onClick={ handleScrollUp }>
            <button type={'button'} className={ styles.goTop }>
                <span className={ styles.goTopIcon }>expand_less</span>
            </button>
        </div>
    )
}

export default GoTopButton
