import { Route } from "@models/routes"

export const getBreadcrumbs = (pathname: string, catalog: Route[]) => {
    const routes: string[] = ['/']
    const arr = pathname.split('/').filter(Boolean)

    for (let i = 0; i < arr.length; i++) {
        routes.push('/' + arr.slice(0, i + 1).join('/'))
    }
    return routes.map((path) => catalog.find((route) => route.path === path))
}