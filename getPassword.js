const check = getPasswordChecker("test")
function getPasswordChecker(password) {
    return function (code) {
        if (password === code) {
            return true
        }
        return false
    }
}


console.log(check('jf'));
console.log(check('test'));
