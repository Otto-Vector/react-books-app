import React from 'react';
import classes  from './header.module.scss'
import bgBooks from "../../images/bg_books.jpg";
import {InputForm} from "../input-form/input-form";

const headerStyle: React.CSSProperties = {
    "backgroundImage": `linear-gradient(90deg, #00000020, #00000080), url(${ bgBooks })`
}

export class Header extends React.Component {


    headerText: string = 'Search for books'

    render(): React.ReactNode {
        return (
        <header style={ headerStyle } className={ classes.header }>
            <h1 className={ classes.head }>{ this.headerText }</h1>
            <div className={ classes.inputForm}>
                <InputForm/>
            </div>
        </header>
    );
    }
}
