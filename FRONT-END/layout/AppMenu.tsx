/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Usuario',
                    icon: 'pi pi-fw pi-user',
                    to: '/pages/usuario'
                },
                {
                    label: 'Recursos',
                    icon: 'pi pi-fw pi-file',
                    to: '/pages/recurso'
                },
                {
                    label: 'Perfil',
                    icon: 'pi pi-fw pi-users',
                    to: '/pages/perfil'
                },
                {
                    label: 'Perfil-Usuario',
                    icon: 'pi pi-fw pi-users',
                    to: '/pages/perfil-usuario'
                },
                {
                    label: 'Permissao',
                    icon: 'pi pi-fw pi-users',
                    to: '/pages/permissao-perfil-recurso'
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
