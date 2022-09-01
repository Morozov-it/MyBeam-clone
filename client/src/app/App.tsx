import React from 'react'
import { ConfigProvider } from 'antd'
import ru_RU from 'antd/lib/locale/ru_RU'
import Router from './Router'

const App: React.FC = () => (
    <ConfigProvider locale={ru_RU}>
        <Router />
    </ConfigProvider>
)

export default App
