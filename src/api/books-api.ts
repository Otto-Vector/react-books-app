import axios from "axios";
import {BooksApiResponseType, BooksRequest, PaginationType} from "../types/books-api-types";

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/',
})

const API_KEY = 'AIzaSyAYL_h8bTjemmcHhKGtf2V9-CtalYYMT04'

export const getBooksFromApi = ({bookName, categories, sortingBy}: BooksRequest,
                                {startIndex = 0, maxResults = 10}: PaginationType) => {
  let subject = (categories === 'all') ? '' : `+subject:${ categories }`
  return instance.get<BooksApiResponseType>(
    `volumes?q=${ bookName }${ subject }&orderBy=${ sortingBy }
    &startIndex=${ startIndex }&maxResults=${ maxResults }&projection=lite&key=${ API_KEY }`)
    .then(response => response.data)
}
