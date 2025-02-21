import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { DriversComponent } from './app/pages/drivers/drivers.component';

export const appRoutes: Routes = [
    {
        path: 'app',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'drivers', component: DriversComponent },
        ]
    },
    { path: '', component: Landing },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
