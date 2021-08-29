import React, {MouseEventHandler} from "react";
import './input-book-name.scss'


export class InputBookName extends React.Component{

    textInput : React.Ref<HTMLInputElement>
    constructor (props:any) {
        super(props);
        this.textInput = React.createRef()
    }

    private thisClass : string = 'input-book-name'
    private readonly mainClass = {
        main: this.thisClass,
        input: this.thisClass + '__input',
        mode: {
            search: this.thisClass + '--search',
            dropdown: this.thisClass + '--dropdown'
        },
        clearButton : this.thisClass + '__clear-search'
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
                className={`${this.mainClass.main} ${this.mainClass.mode.search}` }>
                <button type='reset'
                        className={ this.mainClass.clearButton }
                        onClick={this.focus()}
                > </button>
                <input id={ this.inputName }
                       placeholder={ this.inputPlaceholder }
                       type={ this.inputType }
                       className={ this.mainClass.input }
                       ref={this.textInput}
                />
            </div>
        );
    };
}
