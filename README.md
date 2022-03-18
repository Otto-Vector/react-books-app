React Google Book Search

Задание на реализацию взято [отсюда](https://github.com/fugr-ru/frontend-javascript-test-2)

Рабочий сайт на Heroku:  
Open [WORKING SITE HERE](https://books-app-otto.herokuapp.com) to view it in the browser.

Использовано:
- React (функциональный подход + хуки)
- TypeScript
- SASS (SCSS)
- Redux
- react-final-form (для обработки/передачи введённых данных)
- прочие микроутилиты и функции

Deploy:
- Heroku = https://books-app-otto.herokuapp.com
- Docker = ???


/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /   
SHORT:  
heroku login  
heroku create books-app-otto --buildpack mars/create-react-app  
git rm package-lock.json  
git rm yarn.lock  
git push heroku master

