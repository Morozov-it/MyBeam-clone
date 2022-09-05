import React, { useCallback, useMemo, useState } from 'react'
import { Button, Slider, Space } from 'antd'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import parseBigValue from '@utils/parseBigValue'
import { SliderMarks } from 'antd/lib/slider'
import { InitialSliderValues } from '../types'

type CustomFilterDropdownProps = FilterDropdownProps & InitialSliderValues

export const DropdownSlider = ({
    setSelectedKeys,
    confirm,
    clearFilters,
    min = 0,
    max = 100,
    step = 10,
    symbol = '',
}: CustomFilterDropdownProps) => {
    const [value, setValue] = useState<[number, number]>([min, max])

    const marks: SliderMarks = useMemo(
        () => ({
            0: {
                style: { left: '0%', transform: 'translateX(0%)', whiteSpace: 'nowrap' },
                label: parseBigValue(min, 3) + symbol,
            },
            100: {
                style: { left: '100%', transform: 'translateX(-100%)', whiteSpace: 'nowrap' },
                label: parseBigValue(max, 3) + symbol,
            },
        }),
        [max, min, symbol],
    )

    const formatter = useCallback((value?: number) => parseBigValue(value ?? 0, 3) + symbol, [symbol])

    const handleSearch = (value: any) => {
        setSelectedKeys([value])
        confirm()
    }

    const handleReset = () => {
        clearFilters && clearFilters()
        confirm()
        setValue([min, max])
    }

    return (
        <div style={{ padding: 8 }}>
            <Slider
                min={min}
                max={max}
                step={step}
                range={{ draggableTrack: true }}
                tipFormatter={formatter}
                marks={marks}
                value={value}
                onChange={(value: [number, number]) => setValue([...value])}
                style={{ marginBottom: 30, display: 'block' }}
            />
            <Space>
                <Button type="primary" onClick={() => handleSearch(value)} size="small" style={{ width: 200 }}>
                    OK
                </Button>
                <Button onClick={handleReset} size="small" style={{ width: 200 }}>
                    Сбросить
                </Button>
            </Space>
        </div>
    )
}
