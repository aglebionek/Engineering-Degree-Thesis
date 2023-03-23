class ButtonFunctions {
    static backspace() {
        window.data.tableGenerated = false
        document.getElementById('nav__table').disabled = true
        document.getElementById('app__input-display').value = document.getElementById('app__input-display').value.slice(0, -1)
        document.getElementById('app__input-rpn').value = ''
        document.getElementById('app__output').value = ''
    }

    static clear() {
        document.getElementById('app__input-display').value = ''
        document.getElementById('app__input-rpn').value = ''
        document.getElementById('app__output').value = ''
        window.data.tableGenerated = false
        document.getElementById('nav__table').disabled = true
    }

    static default(symbol) {
        window.data.tableGenerated = false
        document.getElementById('nav__table').disabled = true

        const getNumberOfLeftPars = () => {
            let numberOfLeftPars = 0
            const value = document.getElementById('app__input-display').value
            for (const char of value) {
                if (char === symbols.leftPar) numberOfLeftPars++
            }
            return numberOfLeftPars
        }

        const getNumberOfRightPars = () => {
            let numberOfRightPars = 0
            const value = document.getElementById('app__input-display').value
            for (const char of value) {
                if (char === symbols.rightPar) numberOfRightPars++
            }
            return numberOfRightPars
        }

        const regex = new RegExp(`^[A-Z${symbols.emptySet}]$`)

        const sentence = document.getElementById('app__input-display').value

        if (symbol === symbols.negation && sentence === '') return

        // if it's an empty string
        if (sentence === '') {
            // add to input only if user adds either a set or a left parenthesis
            if (regex.test(symbol) || symbol === symbols.leftPar) {
                document.getElementById('app__input-display').value = symbol
            }
            return
        }

        // if string is not empty, take the last symbol
        const lastSymbol = sentence[sentence.length - 1]

        switch (lastSymbol) {
            // if last symbol is a set
            case lastSymbol.match(regex)?.input:

                switch (symbol) {
                    // if new symbol is a set, replace the old set
                    case symbol.match(regex)?.input:
                        document.getElementById('app__input-display').value = sentence.slice(0, -1) + symbol
                        break;
                    // if new symbol is a left parenthesis, don't add it
                    case symbols.leftPar:
                        break;
                    // if new symbol is a right parenthesis, add it
                    case symbols.rightPar:
                        if (getNumberOfLeftPars() > getNumberOfRightPars()) {
                            document.getElementById('app__input-display').value += symbol
                        }
                        break;
                    // if new symbol is anything else, add it
                    default:
                        document.getElementById('app__input-display').value += symbol
                        break;
                }

                break;

            // if last symbol is a left parenthesis
            case symbols.leftPar:

                switch (symbol) {
                    // if new symbol is a set, add it
                    case symbol.match(regex)?.input:
                        document.getElementById('app__input-display').value += symbol
                        break;
                    default:
                        break;
                }

                break;

            // if last symbol is a right parenthesis
            case symbols.rightPar:

                switch (symbol) {
                    case symbols.leftPar:
                    case symbol.match(regex)?.input:
                        break;

                    case symbols.rightPar:
                        if (getNumberOfLeftPars() > getNumberOfRightPars()) {
                            document.getElementById('app__input-display').value += symbol
                        }
                        break;

                    default:
                        document.getElementById('app__input-display').value += symbol
                        break;
                }

                break;

            // if last symbol is a negation
            case symbols.negation:

                switch (symbol) {
                    // if new symbol is a set, left par or negation, don't add it
                    case symbol.match(regex)?.input:
                    case symbols.leftPar:
                    case symbols.negation:
                        break;
                    // if new symbol is a right par, add it
                    case symbols.rightPar:
                        if (getNumberOfLeftPars() > getNumberOfRightPars()) {
                            document.getElementById('app__input-display').value += symbol
                        }
                        break;
                    // if it's anything else, add it
                    default:
                        document.getElementById('app__input-display').value += symbol
                        break;
                }

                break;

            // if last symbol is an operator
            default:
                switch (symbol) {
                    // if last symbol is a set or a left par, add it
                    case symbols.leftPar:
                    case symbol.match(regex)?.input:
                        document.getElementById('app__input-display').value += symbol
                        break;

                    case symbol.rightPar:
                        if (getNumberOfLeftPars() > getNumberOfRightPars()) {
                            document.getElementById('app__input-display').value += symbol
                        }

                    default:
                        //replace previous symbol with new symbol
                        document.getElementById('app__input-display').value = sentence.slice(0, -1) + symbol
                        break;

                }
        }

    }

    static run() {
        const sentence = document.getElementById('app__input-display').value
        if (sentence === '') return
        const parenthesized = parenthesize(sentence);
        const rpn = toRPN(parenthesized);
        document.getElementById('app__input-rpn').value = rpn;
        generateBinaries(rpn)
        document.getElementById('app__output').value = calculateBinaries(rpn);
        document.getElementById('nav__table').disabled = false
    }

    static colorize() {
        window.data.colorized = !window.data.colorized
        document.getElementById('colorize__button').classList.toggle('active')
        if (window.data.colorized) {
            const style0 = document.createElement('style');
            style0.id = 'c0'
            style0.innerHTML = '.c0 { color: red; }';
            const style1 = document.createElement('style');
            style1.id = 'c1'
            style1.innerHTML = '.c1 { color: green; }';
            const head = document.getElementsByTagName('head')[0];
            head.appendChild(style0)
            head.appendChild(style1)
            return
        }
        document.getElementById('c0').remove()
        document.getElementById('c1').remove()
    }

    static showTrue() {
        window.data.showTrue = !window.data.showTrue
        document.getElementById('show__true').classList.toggle('active')
        if (window.data.showTrue) {
            const style0 = document.createElement('style');
            style0.id = 't0'
            style0.innerHTML = '.t0 { display: none; }';
            const head = document.getElementsByTagName('head')[0];
            head.appendChild(style0)
            return
        }
        document.getElementById('t0').remove()
    }

    static showFalse() {
        window.data.showFalse = !window.data.showFalse
        document.getElementById('show__false').classList.toggle('active')
        if (window.data.showFalse) {
            const style0 = document.createElement('style');
            style0.id = 't1'
            style0.innerHTML = '.t1 { display: none; }';
            const head = document.getElementsByTagName('head')[0];
            head.appendChild(style0)
            return
        }
        document.getElementById('t1').remove()
    }

    static zoomIn() {
        let zoomStep = window.data.tableZoomStep
        let zoom = window.data.tableZoom
        zoom += zoomStep;
        document.getElementById("app__table").style.fontSize = `${zoom}px`;
        window.data.tableZoom = zoom

    }

    static zoomOut() {
        let zoomStep = window.data.tableZoomStep
        let zoom = window.data.tableZoom
        if (zoom > zoomStep) {
            zoom -= zoomStep;
            document.getElementById("app__table").style.fontSize = `${zoom}px`;
        }
        window.data.tableZoom = zoom
    }

    static zoomReset() {
        let zoom = 24
        document.getElementById("app__table").style.fontSize = `${zoom}px`;
        window.data.tableZoom = zoom
    }
}