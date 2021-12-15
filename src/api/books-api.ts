import axios from "axios";
import {BooksApiResponseType, categoriesType, sortingByType} from "../types/books-api-types";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://www.googleapis.com/books/v1/',
  // transformResponse: (resp) => resp.data,
  headers: {
    "API-KEY": "AIzaSyAYL_h8bTjemmcHhKGtf2V9-CtalYYMT04"
  }
})


export const getBooksFromApi = (bookName: string, categories: categoriesType, sortingBy: sortingByType) =>
     instance.get<BooksApiResponseType>(
       `volumes?q=${bookName}+subject:${categories}&orderBy=${sortingBy}&projection=lite`)
     .then(response => response.data)

