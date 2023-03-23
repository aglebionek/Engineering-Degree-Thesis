const createBinaryString = (nMask) => {
    // nMask must be between -2147483648 and 2147483647
    for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
        nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
    return sMask;
}

const generateBitColumns = (bitsObject, numberOfCases, finalColumn) => {
    let div = ''
    Object.keys(bitsObject).forEach(key => {
        const bitArray = bitsObject[key]
        let str = ''
        bitArray.forEach(num => str += createBinaryString(num))
        div += '<div class="column">'
        div += `<div class="t table-header">${key}</div>`
        for (let i = 0; i < numberOfCases; i++) {
            const bit = str[i]
            let divClass = 'darker'
            if (i % 2 === 0) divClass = 'lighter'
            div += `<div><div class="${divClass} c${bit} t${finalColumn[i]}">${bit}</div></div>`
        }
        div += '</div>'
    })
    return div
}

const generateTable = () => {
    const binaries = window.data.binaries
    const calculations = window.data.calculations
    const numberOfCases = window.data.numberOfCases

    //get last value of calculations object
    const finalColumn = createBinaryString(Object.values(calculations)[Object.keys(calculations).length - 1])
    let div = '<div class="row">'

    // generate index column
    div += '<div class="column">'
    div += '<div class="t table-header">i</div>'
    for (let i = 0; i < numberOfCases; i++) {
        let tempDiv = `<div class="darker t${finalColumn[i]}">${i}</div>`
        if (i % 2 === 0) tempDiv = `<div class="lighter t${finalColumn[i]}">${i}</div>`
        div += `<div>${tempDiv}</div>`
    }

    div += '</div>'
    div += generateBitColumns(binaries, numberOfCases, finalColumn)
    div += generateBitColumns(calculations, numberOfCases, finalColumn)
    div += '</div>'
    document.getElementById('app__table').innerHTML = div
}