import { Route } from "@models/routes"

export const getBreadcrumbs = (pathname: string, catalog: Route[]) => {
    const routes: string[] = []
    const arr = pathname.split('/').filter(Boolean)
    
    for (let i = 0; i <= arr.length; i++) {
        routes.push('/' + arr.join('/'))
        arr.pop()
    }
    
    return routes.reverse().map((path) => catalog.find((route) => route.path === path))
}