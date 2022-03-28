import axios from 'axios'
import { BooksApiResponseType, BooksRequest, PaginationType } from '../types/books-api-types'
import * as queryString from 'querystring'
import { BookInfoType } from '../types/book-info-type'

// const API_KEY = 'AIzaSyAYL_h8bTjemmcHhKGtf2V9-CtalYYMT04'

// переменная лежит в корне проекта в файле '.env'
// заголовок переменной "REACT_APP_" - необходим
const { REACT_APP_API_KEY } = process.env

const instance = axios.create( {
    baseURL: 'https://www.googleapis.com/books/v1/',
} )

// запрос на сервер
export const getBooksFromApi = ( { bookName, categories, orderBy }: BooksRequest,
                                 { startIndex = 0, maxResults = 30 }: PaginationType ) => {
    // непосредственно по имени книги
    const intitle = `+intitle:${ bookName }`
    // категория книг (согласно селектора)
    const subject: string = categories === 'all' ? '' : `+subject:${ categories }`
    // полное или краткое отображение информации в присылаемом ответе
    const projection: 'full' | 'lite' = 'full'
    // выбор языка
    // const langRestrict: 'ru' | 'en' = 'ru'

    // создаём объект для query,
    const params = Object.fromEntries( Object
        .entries( {
            // (q - ищет везде, включая текст описания и доступный текст книги)
            //q: ` ${ bookName }${ subject }`, // вариант, где ищется слово в книгах без привязки к названию
            q: `${ intitle }${ subject }`,
            orderBy, // фильтровать по возрастанию/убыванию
            startIndex, // с какого индекса делать запрос
            maxResults, // запрашиваемое количество книг (максимум 40)
            projection, // полное или краткое отображение инфы (чувствительно к subject)
            // langRestrict, // выбор языка
            key: REACT_APP_API_KEY,
        } )
        // чистим пустые значения
        .filter( n => n[1] !== '' )
        .filter( n => n[1] !== undefined ),
    )
    // меняем значение с процентного на нормальный запрос
    const decodedQuery = decodeURIComponent( queryString.stringify( params ) )
    // возвращаем сам запрос
    return instance.get<BooksApiResponseType>( `volumes?${ decodedQuery }` )
        .then( response => response.data )
}

// загрузка одной книги по ID
export const getOneBookOverIdFromApi = ( bookId: string ) => {
    return instance.get<BookInfoType>( `volumes/${ bookId }` )
        .then( response => response.data )
}
