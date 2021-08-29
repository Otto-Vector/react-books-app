import React from "react";
import classes from "./input-form.module.scss";
import {InputBookName} from "../input-book-name/input-book-name";
import {Dropdown} from "../dropdown/dropdown";

export class InputForm extends React.Component{

    render(): React.ReactNode {

        return (
        <form className={classes.inputForm}>
            <InputBookName />
            <div className={classes.dropdowns}>
                <div className={classes.dropdownLeft}>
                    <Dropdown labelText="Categories" />
                </div>
                <div className={classes.dropdownRight}>
                <Dropdown labelText="Sorting by" />
                </div>
            </div>
        </form>
    );
    }
}
