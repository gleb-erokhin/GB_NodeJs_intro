// Лекция 2

// npm init -y - инициализация проекта, создаются минимально необходимые данные и файлы

// установим библиатеку uuid:
// npm install uuid

const uuid = require('uuid');

// v4 это 4 версия генератора случайного id
const id = uuid.v4();

console.log(id);

//
/**
 * для запуска кода в файле package.json в поле scripts
 * "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
    },
 * удаляем test и заменяем на свои данные 
    "start": "node ./lection_2.js"

*/
