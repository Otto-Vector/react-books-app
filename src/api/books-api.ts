import axios from 'axios'
import { BooksApiResponseType, BooksRequest, PaginationType } from '../types/books-api-types'
import * as queryString from 'querystring'
import { BookInfoType } from '../redux/initial-book'

const API_KEY = 'AIzaSyAYL_h8bTjemmcHhKGtf2V9-CtalYYMT04'

const instance = axios.create( {
    baseURL: 'https://www.googleapis.com/books/v1/',
} )

// запрос на сервер
export const getBooksFromApi = ( { bookName, categories, orderBy }: BooksRequest,
                                 { startIndex = 0, maxResults = 30 }: PaginationType ) => {
    // пока непосредственно по имени появляются небольшие списки, поэтому ищем непосредтвенно по "q"
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
            //q: ` ${ bookName }${ subject }`, // вариант, где ищется слово в книгах без привязки к названию
            q: `${ intitle }${ subject }`,
            orderBy, // фильтровать по возрастанию/убыванию
            startIndex, // с какого индекса делать запрос
            maxResults, // запрашиваемое количество книг (максимум 40)
            projection, // полное или краткое отображение инфы (чувствительно к subject)
            // langRestrict, // выбор языка
            key: API_KEY,
        } )
        // чистим пустые значения
        .filter( n => n[1] !== '' )
        .filter( n => n[1] !== undefined ),
    )
    // меняем значение с процентного на нормальный запрос
    const decodedQuery = decodeURIComponent( queryString.stringify( params ) )

    return instance.get<BooksApiResponseType>( `volumes?${ decodedQuery }` )
        .then( response => response.data )
}


// сообщение об ошибке, когда книга не найдена
// export type BookInfoErrorType = {
//     error: {
//         code: number,
//         message: string,
//         errors: [
//             {
//                 message: string,
//                 domain: string,
//                 reason: string
//             }
//         ]
//     }
// }

// загрузка одной книги по ID
export const getOneBookOverIdFromApi = ( BookId: string ) => {
    return instance.get<BookInfoType>( `volumes/${ BookId }` )
        .then( response => response.data )

}
