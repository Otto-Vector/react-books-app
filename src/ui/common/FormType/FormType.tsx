import React from "react";
import styles from "./FormType.module.scss"
import {FieldState, FormApi} from "final-form";

type OwnProps = {
  resetFieldBy: FormApi
  placeholder?: string
  meta: FieldState<any>
  input: any
}


const FormType = (FormType: string): React.FC<OwnProps> => ({
  input, meta, resetFieldBy, placeholder}) => {

  const isError = (meta.error || meta.submitError) && meta.touched

  return (<div className={ styles.wrapper + ' ' + (isError && styles.error) }>
      <FormType
        { ...input }
        className={ styles.textarea }
        placeholder={ placeholder }
      />
      {/*кнопка для сброса параметров поля
      (проявляется, если переданы методы resetFieldBy={form} в объявленном объекте Field*/ }
      {resetFieldBy && <div
        className={ styles.resetButton }
        onClick={ () => {
          resetFieldBy.change(input.name, '')
          resetFieldBy.resetFieldState(input.name)
        } }
      >
         </div>
      }
      {/*сообщение об ошибке появляется в этом спане*/ }
      { isError && (<span className={ styles.span }>{ meta.error }</span>) }
    </div>
  )
}

export const TextArea = FormType('textarea')
export const Input = FormType('input')
