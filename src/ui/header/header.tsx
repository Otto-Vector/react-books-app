import React from 'react';
import classes from './header.module.scss'
import bgBooks from "../../images/bg_books.jpg";
import {InputForm} from "../input-form/input-form";

const headerStyle: React.CSSProperties = {
    "backgroundImage": `linear-gradient(90deg, #00000020, #00000080), url(${ bgBooks })`
    // "backgroundImage": `linear-gradient(90deg, #00000020, #00000080), url('../../images/bg_books.jpg')`
}

export const Header: React.FC = () => {
    let headerText = 'Search for books'

        return (
        <header style={ headerStyle } className={ classes.header }>
            <h1 className={ classes.head }>{ headerText }</h1>
            <div className={ classes.inputForm}>
                <InputForm/>
            </div>
        </header>
    );

}
