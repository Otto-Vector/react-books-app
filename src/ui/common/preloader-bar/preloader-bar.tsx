import React from 'react'
import styles from './preloader-bar.module.scss'

type OwnProps = {
    height?: string
}

export const PreloaderBar: React.FC<OwnProps> = ( { height = '1.5rem' } ) => {

    return (
        <div className={ styles.wrapper } style={ { 'height': `${ height }` } }>
            <div className={ styles.bar }> </div>
        </div>
    )
}
