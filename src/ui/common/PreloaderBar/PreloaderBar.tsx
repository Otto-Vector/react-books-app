import React from 'react'
import styles from './preloaderBar.module.scss'

type OwnProps = {
}

export const PreloaderBar: React.FC<OwnProps> = () => {

    return (
        <div className={ styles.wrapper } >
            <div className={ styles.bar }> </div>
        </div>
    )
}
