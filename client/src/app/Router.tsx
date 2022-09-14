import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '@components/layout/AppLayout'
import Spinner from '@components/layout/Spinner'
import { useAppSelector } from '@store/store'
import { mergedRoutes } from '@utils/mergeRoutes'
import { publicRoutes } from './routes'

const Router: React.FC = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth)

    return isAuth
        ? (
            <AppLayout>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        {mergedRoutes.map((route) =>
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