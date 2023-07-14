const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs');
const rl = readline.createInterface({ input, output });


let min = 1;
let max = 100;
let randomNumber = Math.floor(Math.random() * 100)

let counter = 0;

function clearing_add(path) {
    if (path) {
        fs.writeFileSync(path, "");
    }

    return function add(line) {
        if (path) {
            fs.appendFile(path, line, 'utf8', (err) => {
                if (err) {
                    console.log("Error");
                }
            });
        }
        console.log(line);
    };
}



function game(response) {

    rl.question(`Введите число от 1 до 100 :\nq - выход из программы\nКакое число :`, (input) => {
        if (input === 'q') {
            response(`Вы вышли из программы. Всего попыток: ${+counter}.\n`);
            rl.close();
            return;
        }

        counter++;

        let userNumber = +input;

        if (isNaN(userNumber) || userNumber < min || userNumber > max) {
            response(`Неправильный ввод. Всего попыток: ${+counter}.\n`);
            game(response);
            return;
        }


        if (userNumber === randomNumber) {
            response(`Вы угадали! Это число: ${randomNumber}. Всего попыток: ${+counter}.\n`);
            rl.close();
            return;
        }

        if (userNumber > randomNumber) {
            response(`Это число меньше чем число : ${userNumber}. Попытка номер : ${counter}.\n`);
        } else {
            response(`Это число больше чем число : ${userNumber}. Попытка номер : ${counter}.\n`);
        }

        rl.pause();
        game(response);
    });
}

let delData = clearing_add("./game-data");
game(delData);