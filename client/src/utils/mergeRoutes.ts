import { authRoutes } from "@app/routes"
import { Route } from "@models/routes"

export const mergeRoutes = (routes: Route[], mergedRoutes: Route[] = []) => {
    for (let i = 0; i < routes.length; i++) {
        mergedRoutes.push(routes[i])
        mergeRoutes(routes[i].innerLinks, mergedRoutes)
    }
    return mergedRoutes
}

export const mergedRoutes = mergeRoutes(authRoutes)