import AppLayout from '@components/layout/AppLayout'
import { useAppSelector } from '@store/store'
import { mergeRoutes } from '@utils/mergeRoutes'
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from './routes'

const Router: React.FC = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth)

    return true
        ? (
            <AppLayout>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {mergeRoutes(authRoutes).map((route) =>
                            <Route key={route.path} path={route.path} element={route.element} />
                        )}
                        <Route path='*' element={<Navigate to='/' replace />} />
                    </Routes>
                </Suspense>
            </AppLayout>
        )
        : (
            <Routes>
                {publicRoutes.map((route) =>
                    <Route key={route.path} path={route.path} element={route.element} />
                )}
            </Routes>
        )
}

export default Router