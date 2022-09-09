import equal from 'deep-equal'
import { IndexedValues } from "@models/contracts"

export const getChangedFields = (obj1: IndexedValues, obj2: IndexedValues, changedFields: string[] = []) => {
    Object.keys(obj1).forEach((key) => {
        if (!equal(obj1[key], obj2[key])) {
            changedFields.push(key)
        }
    })
    return changedFields.join(',')
}