const toRPN = sentence => {
    //resulting sentence after rpn conversion
    let output = '';
    //stack for holding tokens required for later
    let stack = [];

    for (const token of sentence) {
        switch (token) {
            case '(':
                stack.push(token)
                break;
            case ')':
                while (stack[stack.length - 1] !== '(') output += stack.pop();
                stack.pop();
                break;
            case (token.match(/^[A-Z'\u{2205}]$/u)?.input):
                output += token
                break;
            default:
                while (stack.length > 0 && stack[stack.length - 1] !== '(') output += stack.pop();
                stack.push(token);
        }
    }

    return output
}