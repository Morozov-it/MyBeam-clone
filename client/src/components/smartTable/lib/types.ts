import { Catalog } from '@models/base'
import { ColumnType } from 'antd/lib/table/interface'

export type CustomTableFilter = 'search' | 'date-picker' | 'slider'
export type EditType = 'number' | 'text' | 'select'

export type InitialSliderValues = Partial<{
    min: number
    max: number
    step: number
    symbol: string
}>

export type CustomColumnType<T> = ColumnType<T> & {
    editType?: EditType
    editable?: boolean
    editCatalog?: Catalog[]
    customFilter?: CustomTableFilter
    initialSliderValues?: InitialSliderValues
}
