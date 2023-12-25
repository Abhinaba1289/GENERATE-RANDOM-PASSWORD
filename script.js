const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#upparcase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicater]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkBox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let passwrod = "";
let passwordLength = 10;
let checkCount = 0;
handelSlider();
// strength circle color to grey

// copy function
// sliderhandler function
// generatepassword function
// setcolor function
// getRandomInteger function 
// getRandomUppercase function 
// getRandomLowercase function 
// getRandomSymbol function 
// getRandomNumber function 
// calculateStrength function

// set password length
function handelSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //set shadow;
}

function getRandomInteger(min, max) {
    // Math.floor returns roundOf like it returns 2.22 --> 2  also 3.3335 ---> 3
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRandomInteger(0, 9);
}

function generateLowercase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}
function generateUppercase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}

function generateSymbol() {
    const randomNum = getRandomInteger(0, symbols.length);
    return symbols.charAt(randomNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    }
    else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}

async function copycontent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch (e) {
        copyMsg.innerText = "Failed";
    }

    // make copy wala text visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
        copyMsg.innerText="";
    }, 2000);

}




function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkBox) => {
        if (checkBox.checked) {
            checkCount++;
        }
    });

    // special condition 
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handelSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value; // fetch slider value by e 
    handelSlider(); // import in the function
})

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)  // condition not empty
        copycontent();
    
})

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

generateBtn.addEventListener('click', () => {
    // none of the checked
    if (checkCount == 0) {
        return;
    }

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handelSlider();
    }

    // let's start the journey to find new password
    // remove old password
    console.log("Starting the Journey");

    passwrod = "";

    // let's put the staff mentioned by checkBoxes
    // if (uppercaseCheck.checked) {
    //     passwrod+=generateUppercase();
    // }
    // if (lowercaseCheck.checked) {
    //     passwrod+=generateLowercase();
    // }
    // if (numberCheck.checked) {
    //     passwrod+=generateRandomNumber();
    // }
    // if (symbolCheck.checked) {
    //     passwrod+=generateSymbol();
    // }


    let funcArr = [];

    if (uppercaseCheck.checked) 
        funcArr.push(generateUppercase);
    
    if (lowercaseCheck.checked) 
        funcArr.push(generateLowercase);
    
    if (numberCheck.checked) 
        funcArr.push(generateRandomNumber);
    
    if (symbolCheck.checked) 
        funcArr.push(generateSymbol);
    

    // compulsury addition 
    for (let i = 0; i < funcArr.length; i++) {
        passwrod += funcArr[i]();
    }
    console.log("COmpulsory adddition done");
    // remaining addition 
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRandomInteger(0, funcArr.length);
        console.log("randIndex" + randIndex);
        passwrod += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");

    passwrod = shufflePassword(Array.from(passwrod));
    console.log("Shuffling done");

    passwordDisplay.value = passwrod;
    console.log("UI adddition done");

    calcStrength();

})