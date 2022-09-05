import { DataIndex } from 'rc-table/lib/interface'

const recursionObjectSearch = (obj: Record<string, any>, keys?: DataIndex): string => {
    if (!keys) return ''

    if (!Array.isArray(keys)) {
        return obj[keys as string] ?? ''
    }

    const tempKeys = [...keys]
    for (let i = 0; i < tempKeys.length; i++) {
        const key = tempKeys[i]
        if (obj[key]) {
            const entity = obj[key]
            if (tempKeys.length === 1) {
                return entity
            }
            tempKeys.shift()
            return recursionObjectSearch(entity, tempKeys)
        }
    }
    return ''
}

export default recursionObjectSearch
