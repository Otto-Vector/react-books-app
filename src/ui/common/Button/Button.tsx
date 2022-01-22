import React from 'react'
import classes from './button.module.scss'

type OwnProps = {
    disabled: boolean,
    onclick: () => void,
    text: string,
    mode: 'Orange' | 'Blue' | 'Pink' | 'Gray' | 'White' | 'NoFill'
}

export const Button: React.FC<OwnProps> = (
    { disabled, onclick, mode } ) => {

    return <button className={ classes.button + ' ' + classes['button' + (mode || 'Orange')] }
                   disabled={ disabled }
                   onClick={ onclick }
    >Load more
    </button>
}

