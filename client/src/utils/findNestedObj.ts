export const findNestedObj = <T,>(entireObj: T[], keyToFind: string, valToFind: string): T | undefined => {
    let foundObj
    JSON.stringify(entireObj, (_, nestedValue) => {
        if (nestedValue && nestedValue[keyToFind] === valToFind) {
            foundObj = nestedValue
        }
        return nestedValue
    })
    return foundObj
}