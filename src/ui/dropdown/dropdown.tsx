import React from 'react';
import classes from './dropdown.module.scss'

export type selectValues = {
    value: string
    text: string
}

export interface DropdownProps {
    labelText? : string
    selectValues? : selectValues[]
}


export class Dropdown extends React.Component<Readonly<DropdownProps>> {

    inLabelText : string = this.props.labelText || "Label text not set"
    inSelectValues : selectValues[] = this.props.selectValues || [{value: '1', text:'One'}, {value: '2', text:'Two'}]

    render(): React.ReactNode {
        return (
        <div className={classes.dropdown}>
            <label className={classes.label}>{this.inLabelText}
            </label>
                <select id={"77"} className={classes.select} defaultValue={'value1'}>
                    {
                        this.inSelectValues.map(
                            ({value,text}) =>
                                <option value={value} key={value}> {text} </option>
                        )
                    }

                </select>
        </div>
    );
    }
}
