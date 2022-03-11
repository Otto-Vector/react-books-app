import React from 'react'
import styles from './preloader.module.scss'
import preLoader from '../../../images/Spinner.svg'


type OwnProps = {
    hSize?: string
}

export const Preloader: React.FC<OwnProps> = ( { hSize = '100%' } ) => {

    return (
        <span className={ styles.preloader } >
            <img className={ styles.image } style={ { 'height': `${ hSize }` } } src={ preLoader } alt='preload'/>
        </span>
    )
}
