let resultEl = document.getElementById('result')
let lengthEl = document.getElementById('length')
let uppercaseEl = document.getElementById('uppercase')
let lowercaseEl = document.getElementById('lowercase')
let numbersEl = document.getElementById('numbers')
let symbolsEl = document.getElementById('symbols')
let generateEl = document.getElementById('generate')
let clipboardEl = document.getElementById('clipboard')
let randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// Generate event
generateEl.addEventListener('click', () => {
    let length = +lengthEl.value
    let hasLower = lowercaseEl.checked
    let hasUpper = uppercaseEl.checked
    let hasNumber = numbersEl.checked
    let hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

// Generate password
function generatePassword(lower, upper, number, symbol, length){

    let generatedPassword = ''
    let passwordmustbe = 'Password 4-20 karakter, ceklis setting minimal 1'

    let typesCount = lower + upper + number + symbol

    // console.log('typeCount: ', typesCount)

    let typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])
    // console.log('typesArr: ', typesArr)

    if(typesCount === 0 || typesCount > 20){
        return passwordmustbe
    }
    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            let functionName = Object.keys(type)[0]
            // console.log('functionName: ', functionName)
            generatedPassword += randomFunction [functionName]()
        })
    }
    let resultGenerated = generatedPassword.slice(0, length)
    return resultGenerated
}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
// console.log(getRandomLower())

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
// console.log(getRandomUpper())

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
// console.log(getRandomNumber())

function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
// console.log(getRandomSymbol())

// Copy to clipboard
clipboardEl.addEventListener('click', () => {
    let textArea = document.createElement('textarea')
    let password = resultEl.innerText

    if(!password){
        return ''
    } else {

    textArea.value = password
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
    alert('SELAMAT! Password tersimpan, Ctrl + V (Paste) sesuai kebutuhanmu!')
    }
})

// Sound Effect
let success = new Audio();
success.src = 'assets/success-sound.mp3';