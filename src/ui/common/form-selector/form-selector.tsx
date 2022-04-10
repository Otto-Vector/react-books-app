import React from 'react'

import { Field,} from 'react-final-form'
import styles from './form-selector.module.scss'
import { categoriesArray, orderByArray } from '../../../types/books-api-types'

type OwnProps = {
    named: string
    values: typeof orderByArray | typeof categoriesArray
    label?: string
}

export const FormSelector: React.FC<OwnProps> = ({
    values,
    named,
    label
                                                 }) => {
    return <div className={ styles.dropdown }>
        { label && <label className={ styles.label }>{ label }</label> }
        <Field className={ styles.select } name={ named } component={ 'select' }>
            { values.map( value =>
                <option value={ value } key={ value }>{ value }</option> )
            }
        </Field>
    </div>
}
