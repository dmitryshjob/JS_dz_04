const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs');
const rl = readline.createInterface({ input, output });

let min = 1;
let max = 100;
let randomNumber = Math.floor(Math.random() * 100);

async function clearing(path) {
    if (path) {
        await fs.promises.writeFile(path, "");
        return;
    }
}

async function add(text) {
    await fs.promises.appendFile("./game-data", text, (err) => {
        if (err) {
            console.log("Error");
            return;
        }
    });

}

async function game() {

    let counter = 0;

    async function userInput() {
        let promise = new Promise(function (resolve, reject) {
            rl.question('Введите число от 1 до 100 :\nq - выход из программы\nКакое число :', (input) => {
                let number = input;
                if (input === 'q') {
                    let text = `Вы вышли из программы. Всего попыток: ${+counter}.`;
                    add(text);
                    console.log(text)
                    return rl.close();
                }
                rl.pause();
                return resolve(number);

            });
        });
        return await promise;
    }

    while (true) {
        let input = await userInput();
        let userNumber = +input;
        counter++;

        if (isNaN(userNumber) || userNumber < min || userNumber > max) {
            let text = `Неправильный userInput. Всего попыток: ${+counter}.\n`;
            add(text);
            console.log(text);
            continue;
        }

        if (userNumber === randomNumber) {
            let text = `Вы угадали! Это число равно: ${randomNumber}. Всего попыток: ${+counter}\n`;
            add(text);
            console.log(text);
            break;
        }

        if (userNumber > randomNumber) {
            let text = `Это число меньше чем число : ${userNumber}. Всего попыток:${counter}\n`;
            add(text);
            console.log(text);
        } else {
            let text = `Это число больше чем число : ${userNumber}. Всего попыток:${counter}\n`;
            add(text);
            console.log(text);
        }
    }
    rl.close();
}

console.log(randomNumber)
let delData = clearing("./game-data");
game(delData);