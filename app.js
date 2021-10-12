class Calculator{

    constructor(prevOpTextElement, currentOpTextElement){
        this.prevOpTextElement = prevOpTextElement
        this.currentOpTextElement = currentOpTextElement
        this.clear()
    }

    clear(){
        this.previousOperand = ""
        this.currentOperand = ""
        this.operation = undefined

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNum(number){
        if (number === "." && this.currentOperand.includes("."))return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentOperand === "") return
        if (this.previousOperand !== ""){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "*":
                computation = prev * current
                break
            case "/":
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }

    getDisplayNum(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ""
        }else{
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOpTextElement.innerText = this.getDisplayNum(this.currentOperand)
        if (this.operation != null){
            this.prevOpTextElement.innerText = `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
        }else{
            this.prevOpTextElement.innerText = ""
        }
        
    }
}

const numberBtns = document.querySelectorAll("[data-num]")
const operationBtns = document.querySelectorAll("[data-operation]")
const equalBtn = document.querySelector("[data-equals]")
const delBtn = document.querySelector("[data-delete]")
const allClearBtn = document.querySelector("[data-all-clear]")
const prevOpTextElement = document.querySelector("[data-previous-op]")
const currentOpTextElement = document.querySelector("[data-current-op]")

const calculator = new Calculator(prevOpTextElement, currentOpTextElement)

numberBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalBtn.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearBtn.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

delBtn.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})