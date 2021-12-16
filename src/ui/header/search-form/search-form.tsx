import React from 'react';
import styles from './search-form.module.scss'

import {Field, Form} from "react-final-form";
import {composeValidators, required} from "../../../utils/validators";
import {BooksRequest} from "../../../types/books-api-types";
import {Input} from "../../common/FormType/FormType";

//
// const selectProps = {
//   categories: ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'],
//   sortingBy: ['relevance', 'newest']
// }

type OwnProps = {
  // initialValues: BooksRequest
  onSubmit: (searchForm: BooksRequest) => void
  // selectProps: typeof selectProps
}

const SearchForm: React.FC<OwnProps> = ({onSubmit}) => {
  const selectProps = {
    categories: ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'],
    sortingBy: ['relevance', 'newest']
  }
  return (
    <Form
      onSubmit={ onSubmit }
      initialValues={ {
        bookName: '',
        categories: 'all',
        sortingBy: 'newest'
      } as BooksRequest }
      render={
        ({submitError, handleSubmit, pristine, form, submitting, values}) => (
          <form onSubmit={ handleSubmit }>
            <div className={ styles.input }>
              <Field name={ 'bookName' }
                     placeholder={ 'Enter book here' }
                     component={ Input }
                // type={ '' }
                     validate={ composeValidators(required) }
                     onKeyDown={ (e: React.KeyboardEvent<HTMLDivElement>) => {
                       (e.key === "Enter") && form.submit()
                     } }
              />
            </div>
            <Field name={ 'categories' } component={ 'select' }>
              { selectProps.categories.map(value =>
                <option value={ value }>{ value }</option>)
              }
            </Field>
            <Field name={ 'sortingBy' } component={ 'select' }>
              { selectProps.sortingBy.map(value =>
                <option value={ value }>{ value }</option>)
              }
            </Field>
            <button className={ styles.button } type={ 'submit' } disabled={ submitting }>Done</button>
            <button type={ 'button' }
                    className={ styles.button }
                    disabled={ pristine || submitting }
                    onClick={(e)=>{form.reset()} }
            >X
            </button>
            { submitError && <span className={ styles.onError }>{ submitError }</span> }
          </form>
        )
      }/>
  )
}

export default SearchForm
