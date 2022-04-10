import React from 'react'
import styles from './search-form.module.scss'

import { Field, Form } from 'react-final-form'
import { Input } from '../../common/form-type/form-type'
import { composeValidators, maxLength50, required } from '../../../utils/validators'
import { BooksRequest } from '../../../types/books-api-types'
import { useSelector } from 'react-redux'
import { Button } from '../../common/button/button'
import { getSelectFormsProps } from '../../../selectors/request-form-selectors'
import { FormSelector } from '../../common/form-selector/form-selector'
import { MaterialIcon } from '../../common/material-icon/material-icon'


type OwnProps = {
    onSubmit: ( searchForm: BooksRequest ) => void
}

export const SearchForm: React.FC<OwnProps> = ( { onSubmit } ) => {

    const { categories, orderBy } = useSelector( getSelectFormsProps )
    const initialValues = {
        bookName: '',
        categories: 'all',
        orderBy: 'relevance',
    } as BooksRequest

    return (
        <Form
            onSubmit={ onSubmit }
            initialValues={ initialValues }
            render={
                ( { submitError, handleSubmit, pristine, form, submitting } ) => (
                    <form onSubmit={ handleSubmit }>
                        <Field name={ 'bookName' }
                               placeholder={ 'Enter book here' }
                               component={ Input }
                               resetFieldBy={ form }
                               type={ 'input' }
                               validate={ composeValidators( required, maxLength50 ) }
                        />
                        <div className={ styles.dropdowns }>
                            <FormSelector named={'categories'} values={categories} label={'Categories'}/>
                            <FormSelector named={'orderBy'} values={orderBy} label={'Sorting by'}/>
                        </div>
                        <div className={ styles.buttonsPanel }>
                            <Button type={ 'submit' }
                                    disabled={ submitting }
                                    mode={ 'White' }
                                    title={ 'Clear results & New Search' }
                            >Done</Button>
                            <Button type={ 'reset' }
                                    disabled={ pristine || submitting }
                                    onClick={ () => {
                                        form.reset()
                                    } }
                                    title={ 'Restore all fields to default' }
                                    mode={ 'Gray' }
                            ><MaterialIcon icon_name={ 'close' }/></Button>
                        </div>
                        { submitError && <span className={ styles.onError }>{ submitError }</span> }
                    </form>
                )
            }/>
    )
}
