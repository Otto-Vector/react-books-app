import React, {MouseEventHandler} from "react";
import classes from './input-book-name.module.scss'


export class InputBookName extends React.Component{

    textInput : React.Ref<HTMLInputElement>
    constructor (props:any) {
        super(props);
        this.textInput = React.createRef()
    }


    private readonly inputName = 'bookNameSearch'
    private readonly inputType = 'text'
    private readonly inputPlaceholder = 'Введите название книги'

    //фокусировка после сброса
    focus(): MouseEventHandler<HTMLButtonElement> {
        return (event => {
            // @ts-ignore
            this.textInput.current.focus()
        })
    }

    render() {
        return (
            <div
                className={`${classes.inputBookName} ${classes.search}` }>
                <button type='reset'
                        className={ classes.clearSearch }
                        onClick={this.focus()}
                > </button>
                <input id={ this.inputName }
                       className={ classes.input }
                       placeholder={ this.inputPlaceholder }
                       type={ this.inputType }
                       ref={this.textInput}
                />
            </div>
        );
    };
}
