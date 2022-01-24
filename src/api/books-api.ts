import axios from 'axios'
import { BooksApiResponseType, BooksRequest, PaginationType } from '../types/books-api-types'
import * as queryString from 'querystring'

const instance = axios.create( {
    baseURL: 'https://www.googleapis.com/books/v1/',
} )

const API_KEY = 'AIzaSyAYL_h8bTjemmcHhKGtf2V9-CtalYYMT04'

export const getBooksFromApi = ( { bookName, categories, orderBy }: BooksRequest,
                                 { startIndex = 0, maxResults = 30 }: PaginationType ) => {
    const intitle = `intitle:${ bookName }`
    const subject = (categories === 'all') ? '' : `+subject:${ categories }`
    const projection: 'full' | 'lite' = 'full'
    const langRestrict: 'ru' | 'en' = 'ru'

    // создаём объект для query,
    const query = Object.fromEntries( Object
        .entries( {
            q: `${ intitle }${ subject }`,
            orderBy,
            startIndex,
            maxResults,
            projection,
            langRestrict,
            key: API_KEY,
        } )
        // чистим пустые значения
        .filter( n => n[1] !== '' )
        .filter( n => n[1] !== undefined ),
    )
    // меняем значение с процентного на нормальный запрос
    const decodedQuery = decodeURIComponent( queryString.stringify( query ) )

    return instance.get<BooksApiResponseType>( `volumes?${ decodedQuery }` )
        .then( response => response.data )
}
