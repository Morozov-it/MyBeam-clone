import { RouteProps } from "react-router-dom"

export interface Route extends RouteProps {
    path: string
    title: string
    innerLinks: Route[]
    icon: React.ReactNode | null
}