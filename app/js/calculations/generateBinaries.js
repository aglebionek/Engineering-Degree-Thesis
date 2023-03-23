const generateBinaries = sentence => {
    //look for letters to determine how many unique sets we have
    /** @type {string[]} */
    const sets = [...new Set(sentence.match(/[A-Z]/g))].sort()

    //initialize binaries object and calculate necessary data
    /** @type {Object.<string, number[]>} */
    const binaries = {};
    const numberOfCases = 2 << sets.length - 1; //2^sets.length
    const arraySize = Math.ceil(numberOfCases / 32);

    for (const set of sets) binaries[set] = [];

    //generate binaries for all possible cases
    sets.reverse()
    let temp;
    let index = 0;
    let shift = 31;
    for (let i = 0; i < numberOfCases; i++) {
        temp = i;
        for (const set of sets) {
            binaries[set][index] |= ((temp & 1) << shift);
            temp >>= 1;
        }
        shift--;

        if ((i + 1) % 32 === 0) {
            index++;
            shift = 31;
        }
    }

    //binary for empty set if it exists
    if (sentence.includes(symbols.emptySet)) binaries[symbols.emptySet] = Array(arraySize).fill(0);

    // export data to be accessible in the entire app
    window.data.numberOfCases = numberOfCases;
    window.data.arraySize = arraySize;
    window.data.binaries = binaries;
}