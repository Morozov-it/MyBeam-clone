import { ColumnType } from 'antd/lib/table/interface'

export type CustomTableFilter = 'search' | 'date-picker' | 'slider'

export type InitialSliderValues = Partial<{
    min: number
    max: number
    step: number
    symbol: string
}>

export type CustomColumnType<T> = ColumnType<T> & {
    customFilter?: CustomTableFilter
    initialSliderValues?: InitialSliderValues
}
