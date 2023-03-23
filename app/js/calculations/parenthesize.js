const parenthesize = sentence => {
    //regex to check if a symbol is a set or negation sign
    const regex = new RegExp(`^[A-Z${symbols.emptySet}${symbols.negation}]$`)

    //starting the output with extra parentheses so there will always be matching parentheses for the ones we've added
    let output = '(((((';

    for (const token of sentence) {
        switch (token) {
            case symbols.difference:
            case symbols.intersection:
            case symbols.union:
                output += `)${token}(`
                break;

            case symbols.equals:
            case symbols.inclusion:
            case symbols.negInclusion:
            case symbols.inclusionSharp:
            case symbols.negInclusionSharp:
                output += `))${token}((`
                break;

            case symbols.implication:
            case symbols.equivelance:
                output += `)))${token}(((`
                break;

            case token.match(regex)?.input:
                output += token
                break;

            case '(':
                output += '((((';
                break;

            case ')':
                output += '))))';
                break;

            default:
                throw new Error(`Incorrect symbol ${token}`)
        }
    }

    //ending the output with extra parentheses so there are always matching parentheses for the ones we've added
    output += ')))))';

    return output;
}