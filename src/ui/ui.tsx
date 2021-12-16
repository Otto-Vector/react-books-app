import React from 'react'
import classes from './ui.module.scss'
import Header from "./header/header";
import BooksContainer from "./books-container/books-container";

export const UiComponent : React.FC = () => {
    return (
        <section className={classes.ui}>
            <Header/>
            <BooksContainer/>
        </section>
    );
}
