import React from 'react';
import classes from './dropdown.module.scss'


// type labelText = string

export class Dropdown extends React.Component<Readonly<typeof labelText>> {


    constructor(props: any) {
        super(props);
    }

    inLabelText = this.props.labelText || "Label text"

    render(): React.ReactNode {
        return (
        <div className={classes.dropdown}>
            <label htmlFor={classes.dropdown} className={classes.label}>{this.inLabelText}
            </label>
                <select id={"77"} className={classes.select}>
                    <option value="value1">Значение 1</option>
                    <option value="value2" selected>Значение 2</option>
                    <option value="value3">Значение 3</option>
                </select>
        </div>
    );
    }
}
