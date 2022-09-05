const parseBigValue = (value: number | string, bitCount: number, fixedDecimal = -1): string => {
    if (!value) {
        return '0'
    }
    if (bitCount === 0) {
        return value.toString()
    }
    let result = ''
    let stringValue: string =
        fixedDecimal === -1 || typeof value === 'string' ? value.toString() : value.toFixed(fixedDecimal)
    while (!!stringValue) {
        const choosedLastChars: string = stringValue.slice(-bitCount)
        result = ' ' + choosedLastChars + result
        const length: number = stringValue.length
        stringValue = length - bitCount > 0 ? stringValue.slice(0, length - bitCount) : ''
    }
    return result.trim()
}

export default parseBigValue
