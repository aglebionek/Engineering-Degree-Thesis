const buttons = ['A', 'B', '(', ')', 'CE', symbols.backspace, 'C', 'D', symbols.intersection,
    symbols.union, symbols.inclusion, symbols.inclusionSharp, 'E', 'F', symbols.negation, symbols.difference,
    symbols.negInclusion, symbols.negInclusionSharp, 'G', symbols.emptySet, symbols.implication, symbols.equivelance,
    symbols.equals, symbols.run
];

const generateCalculatorButtons = () => {
    window.data.buttons = buttons;
    buttons.forEach(button => {
        let onclick = `ButtonFunctions.default('${button}')`;
        switch (button) {
            case symbols.backspace:
                onclick = 'ButtonFunctions.backspace();'
                break;
            case symbols.clear:
                onclick = 'ButtonFunctions.clear();'
                break;
            case symbols.run:
                onclick = 'ButtonFunctions.run();'
                break;
            default:
        }
        const buttonElement = `<button class='app__grid-item button' tabindex='-1' id='button${button}' onclick=${onclick} >${button}</button>`;
        document.getElementById('app__grid').innerHTML += buttonElement;
    })
}
