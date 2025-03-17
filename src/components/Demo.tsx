export function demo(a: number = 0, b: number = 0) {
    return (a + b);
}

export function checkSpecific(...numbers: number[]) {
    return numbers.reduce((acc, num) => num + acc, 0)
}