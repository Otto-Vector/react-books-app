import React from 'react'
import classes from './button.module.scss'

type OwnProps = {
    disabled: boolean,
    onClick?: () => void,
    mode?: 'Orange' | 'Blue' | 'Pink' | 'Gray' | 'White' | 'NoFill'
    type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<OwnProps> = (
    { disabled, onClick, mode = 'NoFill', type = 'button', children } ) => {

    return <button className={ classes.button + ' ' + classes['button' + mode] }
                   disabled={ disabled }
                   onClick={ onClick }
                   type={ type }
    >{ // отображаем то что внутри тега Button
        children
    }
    </button>
}

