
//References====================================================================
const letterContainer = document.getElementById("letter-container")

const optionsContainer = document.getElementById("options-container")

const userInputContainer = document.getElementById("userinput-container")

const newGameContainer = document.getElementById("newgame-container")

const newGameButton = document.getElementById("newgame-button")

const canvas = document.getElementById("canvas")

const resultText = document.getElementById("result-text")

//Word Categories====================================================================
let options = {
    Fruits:[
        "Apple",
        "Pineapple",
        "Watermelon"
    ],
    Animals:[
        "Shark",
        "Tiger",
        "Bat",
    ],
    Countries:[
        "India",
        "Hungary",
        "Zimbabwe"
    ],
}

//====================================================================
let winCount = 0

let count = 0

let chosenWord = ""

//Display option buttons====================================================================
const displayOptions = () => {
    optionsContainer.innerHTML+=`<h3>Please select an option.</h3>`

    let buttonCon = document.createElement("div")

    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`
    }

    optionsContainer.appendChild(buttonCon)

}

//Block all buttons====================================================================
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options")

    let letterButtons = document.querySelectorAll(".letters")

    //disable options
    optionsButtons.forEach(button => {
        button.disabled = true
    })

    //disable letters
    letterButtons.forEach(button => {
        button.disabled = true
    })

    newGameContainer.classList.remove("hide")
}

//Word Generator ====================================================================
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options")
    
    //If button.innterText = optionValue then highlight button
    optionsButtons.forEach((button) => {
        if(button.innerText.toLowerCase() === optionValue){
            button.classList.add("active")
        }
        button.disabled = true
    })

    //Hide letters, clear previous word
    letterContainer.classList.remove("hide")
    userInputContainer.innerText = ""

    let optionArray = options[optionValue]

    //Choose random word
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)]
    chosenWord = chosenWord.toUpperCase()
    console.log(chosenWord)

    //Replace letter with dash
    let displayItem = chosenWord.replace(/./g,'<span class="dashes">_ </span>')

    //Display each element as span
    userInputContainer.innerHTML = displayItem
}

//Initial Function (page load or new game)====================================================================
const initializer =  () => {
    winCount = 0
    count = 0

    //Erase content, hide letter, new game button
    userInputContainer.innerHTML = ""
    optionsContainer.innerHTML = ""
    letterContainer.innerHTML = ""
    letterContainer.classList.add("hide")
    newGameContainer.classList.add("hide")

    //Creating letters
    for(let i = 65; i<91;i++){
        let button = document.createElement("button")
        button.classList.add("letters")

        //Number to ASCIII[A-Z]
        button.innerText = String.fromCharCode(i)

        //Letter button lcick
        button.addEventListener("click", () => {
            let charArrary = chosenWord.split("")
            let dashes = document.getElementsByClassName("dashes")

            //if array contains clicked value, replace dash with letter
            if(charArrary.includes(button.innerText)){
                charArrary.forEach((char, index) => {

                    //if letter in array is same as clicked button
                    if(char === button.innerText){

                        //replace dash in answer with letter
                        dashes[index].innerText = char

                        //increment counter
                        winCount += 1

                        //if winCount = word length then win
                        if(winCount == charArrary.length) {
                            resultText.innerHTML = `<h2 class='win-message'>You win!</h2>
                            <p>The word was <span>${chosenWord}</p>`

                            blocker()

                        }
                    }


                })
            }
            else {
                //lose count add, draw hanging man
                count += 1
                drawMan(count)
                //if lose count = 6 (hanging man appendages) then lose
                if(count == 6){
                    resultText.innerHTML = `<h2 class='lose-message'>You lose!</h2>
                    <p>The word was <span>${chosenWord}</p>`

                    blocker()
                }
            }
            button.disabled = true

        })
        letterContainer.append(button)

    }

    displayOptions()

    //Call canvas (clears previous canvas and creates new)
    let { initialDrawing } = canvasCreator()
    
    //draws hanging frame
    initialDrawing()


}

//Canvas====================================================================
const canvasCreator = () => {
    let context = canvas.getContext("2d")
    context.beginPath()
    context.strokeStyle = "#000"
    context.lineWidth = 2

    //drawing line

    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY)
        context.lineTo(toX, toY)
        context.stroke()
    }

    const head = () => {
        context.beginPath()
        context.arc(70, 30, 10, 0, Math.PI*2, true)
        context.stroke()
    }

    const body = () => {
        drawLine(70, 40, 70, 80)
    }

    const leftArm = () => {
        drawLine(70, 50, 50, 70)
    }

    const rightArm = () => {
        drawLine(70, 50, 90, 70)
    }

    const leftLeg = () => {
        drawLine(70, 80, 50, 110)
    }

    const rightLeg = () => {
        drawLine(70, 80, 90, 100)
    }

    const initialDrawing = () => {
        //clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)

        //bottom line
        drawLine(10, 130, 130, 130)
    
        //left line
        drawLine(10,10,10,131)
    
        //top line
        drawLine(10, 10, 70, 10)
    
        //small top line
        drawLine(70, 10, 70, 20)
    }

    return {initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg}
}

const drawMan = (count) => {
    let {head, body, rightArm, leftArm, rightLeg, leftLeg} = canvasCreator()
    
    switch (count){
        case 1:
            head()
            break
        case 2:
            body()
            break
        case 3:
            rightArm()
            break
        case 4:
            leftArm()
            break
        case 5:
            rightLeg()
            break
        case 6:
            leftLeg()
            break
        default:
            break
    }

}


//New Game====================================================================
newGameButton.addEventListener("click", initializer)
window.onload = initializer