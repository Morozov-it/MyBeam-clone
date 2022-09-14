import React from 'react'
import { InputNumber, InputNumberProps } from 'antd'

const RubInput: React.FC<InputNumberProps> = (props) => {
    return (
        <InputNumber
            {...props}
            prefix="₽"
            style={{ width: '100%' }}
            step={1000}
            formatter={value => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
            parser={value => Number(value!.replace(/\s/g, ''))} />
    )
}

export default React.memo(RubInput)