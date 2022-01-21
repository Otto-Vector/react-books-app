import axios from 'axios'
import { BooksApiResponseType, BooksRequest, PaginationType } from '../types/books-api-types'

const instance = axios.create( {
    baseURL: 'https://www.googleapis.com/books/v1/',
} )

const API_KEY = 'AIzaSyAYL_h8bTjemmcHhKGtf2V9-CtalYYMT04'

export const getBooksFromApi = ( { bookName, categories, sortingBy }: BooksRequest,
                                 { startIndex = 0, maxResults = 30 }: PaginationType ) => {
    const subject = (categories === 'all') ? '' : `+subject:${ categories }`
    // const intitle = `+intitle:${ bookName }`
    const language = '&langRestrict=ru'
    return instance.get<BooksApiResponseType>(
        `volumes?q=${ bookName }${ subject }&orderBy=${ sortingBy }&startIndex=${ startIndex }&maxResults=${ maxResults }&projection=full${ language }&key=${ API_KEY }` )
        .then( response => response.data )
}
