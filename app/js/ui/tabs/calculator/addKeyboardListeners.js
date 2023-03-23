const addKeyboardListeners = () => {
    document.getElementById("app__input-display").addEventListener("keypress", keypressHandler)
    document.getElementById("app__input-display").addEventListener("paste", pasteHandler)
}

const keypressHandler = e => {
    e.preventDefault()
    const setRegex = new RegExp(`^[a-zA-Z]$`)
    const key = e.key
    const isSet = key.match(setRegex)
    if (isSet !== null) return ButtonFunctions.default(isSet.input.toUpperCase())
    if (keyHandlers[key]) keyHandlers[key]()
}

const pasteHandler = e => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')
    const setRegex = new RegExp(`^[a-zA-Z]$`)
    const allowedSymbols = window.data.buttons

    for (let letter of pastedText) {
        const isSet = letter.match(setRegex)
        if (isSet !== null) letter = isSet.input.toUpperCase()
        if (allowedSymbols.includes(letter) || isSet) ButtonFunctions.default(letter)
    }
}

const keyHandlers = {
    "*": () => ButtonFunctions.default(symbols.intersection),
    "+": () => ButtonFunctions.default(symbols.union),
    "-": () => ButtonFunctions.default(symbols.difference),
    "/": () => ButtonFunctions.default(symbols.difference),
    "\\": () => ButtonFunctions.default(symbols.difference),
    "Enter": () => ButtonFunctions.run(),
    "Backspace": () => ButtonFunctions.backspace(),
    "=": () => ButtonFunctions.default('='),
    "`": () => ButtonFunctions.default('`'),
    "(": () => ButtonFunctions.default('('),
    ")": () => ButtonFunctions.default(')'),
    "Escape": () => ButtonFunctions.clear(),
    "0": () => ButtonFunctions.default(symbols.emptySet),
    "8": () => ButtonFunctions.default(symbols.implication),
    "9": () => ButtonFunctions.default(symbols.equivelance),
    "[": () => ButtonFunctions.default(symbols.inclusionSharp),
    "]": () => ButtonFunctions.default(symbols.inclusion),
    ";": () => ButtonFunctions.default(symbols.negInclusionSharp),
    "'": () => ButtonFunctions.default(symbols.negInclusion),
    "F5": () => location.reload()
}