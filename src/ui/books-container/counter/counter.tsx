import React from 'react';
import classes from './counter.module.scss'

type OwnProps = {
  totalBooks: number
}

export const Counter: React.FC<OwnProps> = ({totalBooks}) => {
  return <h2 className={classes.header}>Found {totalBooks} results</h2>
}
