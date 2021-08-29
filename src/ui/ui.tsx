import React from 'react';
import classes from './ui.module.scss'

import {Header} from "./header/header";

export const UiComponent : React.FC = () => {
    return (
        <section className={classes.ui}>
            <Header/>
        </section>
    );
}
