import React from 'react'
import classes from './book-card.module.scss'
import { Link } from 'react-router-dom'

// Найденные книги отображаются карточками, каждая из которых состоит из
// изображения обложки книги, названия книги, названия категории и имен авторов.
// Если для книги приходит несколько категорий, то отображается только первая. Авторы отображаются все.
// Если не приходит какой-либо части данных, то вместо нее просто пустое место.

type ComponentProps = {
    id: string
    imageUrl: string
    category: string[]
    title: string
    authors: string[]
    index: number
}

export const BookCard: React.FC<ComponentProps> = (
    {
        id, imageUrl, category, title, authors, index,
    } ) => {

    const invisibleClass = ( field?: string[] ): string => ` ${ field ? '' : classes.invisible }`

    return <Link to={ '/book/' + id } className={ classes.container } title={ [ index, title ].join( ' - ' ) }>
        <img className={ classes.image } alt={ 'bookName' } src={ imageUrl }/>
        <div className={ classes.category + invisibleClass( category ) }>{ category || 'Unknown category' }</div>
        <div className={ classes.bookName }>{ title }</div>
        <p className={ classes.authors + invisibleClass( authors ) }>{ authors?.join( ' | ' ) || 'AUTHOR NOT DEFINED' }</p>
    </Link>
}
