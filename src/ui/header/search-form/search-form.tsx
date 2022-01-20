import React from 'react'
import styles from './search-form.module.scss'

import { Field, Form } from 'react-final-form'
import { Input } from '../../common/FormType/FormType'
import { composeValidators, required } from '../../../utils/validators'
import { BooksRequest } from '../../../types/books-api-types'


type OwnProps = {
    onSubmit: ( searchForm: BooksRequest ) => void
}

const SearchForm: React.FC<OwnProps> = ( { onSubmit } ) => {
    const selectProps = {
        categories: [ 'all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry' ],
        sortingBy: [ 'relevance', 'newest' ],
    }
    return (
        <Form
            onSubmit={ onSubmit }
            initialValues={ {
                bookName: '',
                categories: 'all',
                sortingBy: 'relevance',
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
                                <Field className={ styles.select } name={ 'sortingBy' } component={ 'select' }>
                                    { selectProps.sortingBy.map( value =>
                                        <option value={ value } key={ value }>{ value }</option> )
                                    }
                                </Field>
                            </div>
                        </div>
                        <button className={ styles.button } type={ 'submit' } disabled={ submitting }>Done</button>
                        <button type={ 'reset' }
                                className={ styles.button }
                                disabled={ pristine || submitting }
                                onClick={ ( e ) => {
                                    form.reset()
                                } }
                        >X
                        </button>
                        { submitError && <span className={ styles.onError }>{ submitError }</span> }
                    </form>
                )
            }/>
    )
}

export default SearchForm
