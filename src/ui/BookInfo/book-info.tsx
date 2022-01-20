import React from 'react'
import { useParams } from 'react-router-dom'


// здесь буду специально использовать хуки
export const BookInfo: React.FC = () => {
    // вытаскиваем значение роутера
    const { bookId } = useParams<{ bookId: string }>()

    return (<div>
            Book here {bookId}
        </div>
    )
}
