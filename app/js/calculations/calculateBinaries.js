const calculateBinaries = sentence => {
    const calculations = {}
    const arraySize = window.data.arraySize;
    const numberOfCases = window.data.numberOfCases;
    const binaries = window.data.binaries;

    // calculating the result and saving the process
    const stack = [];
    const tableKeys = []
    let token, tableKey, leftArgument, rightArgument, output

    for (let i = 0; i < sentence.length; i++) {
        token = sentence[i];
        output = [];
        tableKey = ''

        if (token.match(/[A-Z\u2205]/u)) {
            stack.push(binaries[token])
            tableKeys.push(token)
            continue
        }

        if (token === symbols.negation) {
            leftArgument = stack.pop();
            tableKey += '(' + tableKeys.pop() + ')' + token
            for (let j = 0; j < arraySize; j++) output.push(~leftArgument[j]);
            stack.push(output)
            calculations[tableKey] = output;
            tableKeys.push(tableKey)
            continue
        }

        rightArgument = stack.pop();
        leftArgument = stack.pop();

        switch (token) {
            case symbols.union:
                for (let j = 0; j < arraySize; j++) output.push(leftArgument[j] | rightArgument[j]);
                break;
            case symbols.difference:
            case symbols.negInclusion:
                for (let j = 0; j < arraySize; j++) output.push(leftArgument[j] & ~rightArgument[j]);
                break;
            case symbols.inclusionSharp:
                for (let j = 0; j < arraySize; j++) output.push(rightArgument[j] & ~leftArgument[j]);
                break;
            case symbols.intersection:
                for (let j = 0; j < arraySize; j++) output.push(leftArgument[j] & rightArgument[j]);
                break;
            case symbols.equals:
            case symbols.equivelance:
                for (let j = 0; j < arraySize; j++) output.push(~(leftArgument[j] ^ rightArgument[j]));
                break;
            case symbols.inclusion:
            case symbols.implication:
                for (let j = 0; j < arraySize; j++) output.push(~leftArgument[j] | rightArgument[j]);
                break;
            case symbols.negInclusionSharp:
                for (let j = 0; j < arraySize; j++) output.push(~rightArgument[j] | leftArgument[j]);
                break;
            default:
                throw new Error(`Incorrect symbol ${token}`);
        }

        let prevKey2 = tableKeys.pop()
        let prevKey1 = tableKeys.pop()
        tableKey += prevKey1 + token + prevKey2
        tableKeys.push(tableKey)

        calculations[tableKey] = output;
        stack.push(output);
    }
    let result = stack.pop();
    let truth = -1 & -1;

    if (numberOfCases < 32) {
        truth <<= (32 - numberOfCases);
        result[0] &= truth;
    }

    window.data.calculations = calculations

    for (const res of result) if (res !== truth) return false;

    return true;
}