const generateDefinitionTable = (bitsObject, k, len) => {
    let div = `<div>`
    div += '<div class="row">'

    div += '<div class="column">'
    div += '<div class="t table-header">i</div>'
    for (let i = 0; i < len; i++) {
        let divClass = 'darker'
        if (i % 2 === 0) divClass = 'lighter'
        div += `<div><div class="${divClass}">${i}</div></div>`
    }
    div += '</div>'

    Object.keys(bitsObject).forEach(key => {
        const bitArray = bitsObject[key]
        div += '<div class="column">'
        div += `<div class="t table-header">${key}</div>`
        for (const i in bitArray) {
            let divClass = 'darker'
            if (i % 2 === 0) divClass = 'lighter'
            div += `<div><div class="${divClass}">${bitArray[i]}</div></div>`
        }
        div += '</div>'
    })
    div += '</div>'
    div += '</div>'
    return div
}

const generateDefinitions = () => {
    const tables = {
        negation: {
            A: [0, 1],
            'A`': [1, 0],
        },
        intersection: {
            A: [0, 0, 1, 1],
            B: [0, 1, 0, 1],
            'A∩B': [0, 0, 0, 1],
        },
        union: {
            A: [0, 0, 1, 1],
            B: [0, 1, 0, 1],
            [`A${symbols.union}B`]: [0, 1, 1, 1],
        },
        'equals; equivalence': {
            A: [0, 0, 1, 1],
            B: [0, 1, 0, 1],
            [`A=B; A${symbols.equivelance}B`]: [1, 0, 0, 1],
        },
        [`implication; inclusion; neg sharp inclusion`]: {
            A: [0, 0, 1, 1],
            B: [0, 1, 0, 1],
            [`A${symbols.implication}B; A${symbols.inclusion}B; B${symbols.negInclusionSharp}A`]: [1, 1, 0, 1],
        },
        'difference; sharp inlcusion; neg inclusion': {
            A: [0, 0, 1, 1],
            B: [0, 1, 0, 1],
            [`A${symbols.difference}B; B${symbols.inclusionSharp}A; A${symbols.negInclusion}B`]: [0, 0, 1, 0],
        }
    }

    let div = '<div class="definitions-tables">'
    Object.keys(tables).forEach(key => {
        div += generateDefinitionTable(tables[key], key, tables[key]['A'].length)
    })
    div += '</div>'

    document.getElementById('app__definitions').innerHTML = div
}