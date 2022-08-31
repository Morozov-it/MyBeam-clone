import type { MenuProps } from 'antd'
import { Route } from '@models/routes'

type MenuItem = Required<MenuProps>['items'][number]

export const getMenuItem = (routes: Route[]) => {
    const menuItems: MenuItem[] = []
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        menuItems.push({
            key: route.path,
            icon: route.icon,
            children: route.innerLinks.length ? getMenuItem(route.innerLinks) : null,
            label: route.title,
        } as MenuItem)
    }
    return menuItems
}