
//response type from 'https://www.googleapis.com/books/v1/'
export type itemBook = {
 "kind": string,
      "id": string,
      "etag": string,
      "selfLink": string,
      "volumeInfo": {
        "title": string,
        "authors": string[],
        "publisher": string,
        "publishedDate": string,
        "description": string,
        "industryIdentifiers": Array<{"type": string, "identifier": string}>,
        "readingModes": {
          "text": boolean,
          "image": boolean
        },
        "pageCount": number,
        "printType": string,
        "categories": string[],
        "maturityRating": string,
        "allowAnonLogging": boolean,
        "contentVersion": string,
        "panelizationSummary": {
          "containsEpubBubbles": boolean,
          "containsImageBubbles": boolean
        },
        "imageLinks": {
          "smallThumbnail": string,
          "thumbnail": string
        },
        "language": string,
        "previewLink": string,
        "infoLink": string,
        "canonicalVolumeLink": string
      },
      "saleInfo": {
        "country": string,
        "saleability": string,
        "isEbook": boolean
      },
      "accessInfo": {
        "country": string,
        "viewability": string,
        "embeddable": boolean,
        "publicDomain": boolean,
        "textToSpeechPermission": string,
        "epub": {
          "isAvailable": boolean
        },
        "pdf": {
          "isAvailable": boolean
        },
        "webReaderLink": string,
        "accessViewStatus": string,
        "quoteSharingAllowed": boolean
      },
      "searchInfo": {
        "textSnippet": string
      }
    }

export type BooksApiResponseType = {
  kind: string,
  totalItems: number
  items: itemBook[]
}

// types for forms
export type SortingByType = 'newest' | 'relevance'
export type CategoriesType = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry'
export type PaginationType = {
  startIndex: number
  maxResults: number
}


export type BooksRequest = {
  bookName: string
  categories: CategoriesType
  sortingBy: SortingByType
}
