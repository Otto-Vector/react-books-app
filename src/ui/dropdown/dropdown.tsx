import React from 'react';
import classes from './dropdown.module.scss'

export type selectValues = {
    value: string
    text: string
}

export interface DropdownProps {
    labelText? : string
    selectValues? : selectValues[]
    defaultValue? : string
}


export class Dropdown extends React.Component<Readonly<DropdownProps>> {
// export class Dropdown extends Comment {

    // selectRef : React.Ref<HTMLSelectElement>

    constructor (props:DropdownProps) {
        super(props);
        // this.selectRef = React.createRef()
        this.state = {
            // @ts-ignore
            value: props.selectValues[0].value
        }
    }

    inLabelText : string = this.props.labelText || "Label text not set"
    inSelectValues : selectValues[] = this.props.selectValues || [{value: '1', text:'One'}, {value: '2', text:'Two'}]

    inSelectValuesElements : React.CElement<selectValues,any>[] = this.inSelectValues
        .map( ({value,text}) =>
            <option value={value} key={value}> {text} </option>)

    // selectIs() : ChangeEventHandler<any> {
    //     // console.log(this.selectRef)
    //     // @ts-ignore
    //     return ( event => console.log(this.selectRef) )
    // }

    // _handleChange(event:ChangeEventHandler) : ChangeEventHandler<HTMLSelectElement> {
    // return (event:ChangeEventHandler => this.setState({ value: event.target.value }))
  // }

    render(): React.ReactNode {
        return (
        <div className={classes.dropdown}>
            <label className={classes.label}>{this.inLabelText}</label>
                <select id={"77"}
                        className={classes.select}
                        defaultValue={this.props.defaultValue}
                        // onChange={ this._handleChange }
                >
                    { this.inSelectValuesElements }
                </select>
        </div>
    );
    }
}
