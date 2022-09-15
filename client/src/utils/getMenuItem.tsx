import React from 'react'
import { MenuProps, Tooltip } from 'antd'
import { Route } from '@models/routes'

type MenuItem = Required<MenuProps>['items'][number]

const isTooltip = (text: string) => 
    text.length > 18 ? <Tooltip title={text}>{text}</Tooltip> : text

export const getMenuItem = (routes: Route[]) => {
    const menuItems: MenuItem[] = []
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        menuItems.push({
            key: route.path,
            icon: route.icon,
            children: route.innerLinks.length ? getMenuItem(route.innerLinks) : null,
            label: isTooltip(route.title),
        } as MenuItem)
    }
    return menuItems
}