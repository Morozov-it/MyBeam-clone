import React from 'react'
import { ConfigProvider } from 'antd'
import ru_RU from 'antd/lib/locale/ru_RU'
import 'moment/locale/ru'
import moment from 'moment'
import Router from './Router'

moment.locale('ru')

const App: React.FC = () => (
    <ConfigProvider locale={ru_RU}>
        <Router />
    </ConfigProvider>
)

export default App
