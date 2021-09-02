import React from "react";
import classes from "./input-form.module.scss";
import {InputBookName} from "../input-book-name/input-book-name";
import {Dropdown, DropdownProps} from "../dropdown/dropdown";

export class InputForm extends React.Component{

    dropdown : DropdownProps[] = [
        {
            labelText: 'Categories',
            selectValues: [
                { value : 'all', text: 'all'},
                { value : 'art', text: 'art'},
                { value : 'biography', text: 'biography'},
                { value : 'computers', text: 'computers'},
                { value : 'history', text: 'history'},
                { value : 'medical', text: 'medical'},
                { value : 'poetry', text: 'poetry'},
            ]
        },
        {
            labelText: 'Sorting by',
            selectValues: [
                { value : 'relevance', text: 'relevance'},
                { value : 'newest', text: 'newest'},
            ]
        }
    ]


    render(): React.ReactNode {

        return (
        <form className={classes.inputForm}>
            <InputBookName />
            <div className={classes.dropdowns}>
                <div className={classes.dropdownLeft}>
                    <Dropdown {...this.dropdown[0]} />
                </div>
                <div className={classes.dropdownRight}>
                    <Dropdown {...this.dropdown[1]} />
                    <Dropdown />
                </div>
            </div>
        </form>
    );
    }
}
