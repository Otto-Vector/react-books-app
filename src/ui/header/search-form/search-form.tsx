import React from 'react'
import styles from './search-form.module.scss'

import { Field, Form } from 'react-final-form'
import { Input } from '../../common/FormType/FormType'
import { composeValidators, required } from '../../../utils/validators'
import { BooksRequest } from '../../../types/books-api-types'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { Button } from '../../common/Button/Button'


type OwnProps = {
    onSubmit: ( searchForm: BooksRequest ) => void
}

const SearchForm: React.FC<OwnProps> = ( { onSubmit } ) => {

    const selectProps = useSelector( ( state: AppStateType ) => state.requestFormReducer.selectProps )

    return (
        <Form
            onSubmit={ onSubmit }
            initialValues={ {
                bookName: '',
                categories: 'all',
                orderBy: 'relevance',
            } as BooksRequest }
            render={
                ( { submitError, handleSubmit, pristine, form, submitting, values } ) => (
                    <form onSubmit={ handleSubmit }>
                        <Field name={ 'bookName' }
                               placeholder={ 'Enter book here' }
                               component={ Input }
                               resetFieldBy={ form }
                               type={ 'input' }
                               validate={ composeValidators( required ) }
                        />
                        <div className={ styles.dropdowns }>
                            <div className={ styles.dropdown }>
                                <label className={ styles.label }>{ 'Categories' }</label>
                                <Field className={ styles.select } name={ 'categories' } component={ 'select' }>
                                    { selectProps.categories.map( value =>
                                        <option value={ value } key={ value }>{ value }</option> )
                                    }
                                </Field>
                            </div>
                            <div className={ styles.dropdown }>
                                <label className={ styles.label }>{ 'Sorting by' }</label>
                                <Field className={ styles.select } name={ 'orderBy' } component={ 'select' }>
                                    { selectProps.orderBy.map( value =>
                                        <option value={ value } key={ value }>{ value }</option> )
                                    }
                                </Field>
                            </div>
                        </div>
                        <div className={styles.buttonsPanel}>
                            <Button type={'submit'} disabled={submitting} mode={'White'}>Done</Button>
                        <Button type={ 'reset' }
                                disabled={ pristine || submitting }
                                onClick={ () => {form.reset()} }
                                mode={'Gray'}
                        >X
                        </Button>
                            </div>
                        { submitError && <span className={ styles.onError }>{ submitError }</span> }
                    </form>
                )
            }/>
    )
}

export default SearchForm
