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
                                                                input, meta, resetFieldBy, placeholder
                                                            }) => {

    const isError = (meta.error || meta.submitError) && meta.touched

    return (<div className={styles.inputBookName +' '+ styles.search +' '+ (isError && styles.error)}>
            {resetFieldBy && <div
              className={styles.clearSearch +' '+ (!meta.dirty && styles.clearSearchUnfocused) }
              // className={styles.resetButton}
              onClick={() => {
                  resetFieldBy.change(input.name, '')
                  resetFieldBy.resetFieldState(input.name)
              }}
            > </div>
            }
              <FormType
                  {...input}
                  className={styles.input}
                  placeholder={placeholder}
              />
                {/*кнопка для сброса параметров поля
      (проявляется, если переданы методы resetFieldBy={form} в объявленном объекте Field*/}

            {/*сообщение об ошибке появляется в этом спане*/}
            {isError && (<span className={styles.errorSpan}>{meta.error}</span>)}
        </div>
    )
}

export const TextArea = FormType('textarea')
export const Input = FormType('input')
