import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [LoginGuard],
    canActivate: [LoginGuard]
  },
  {
    path: '',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/list/list.module').then( m => m.ListPageModule)
      },
      {
        path: 'product/view/:id',
        loadChildren: () => import('./pages/products/view/view.module').then( m => m.ViewPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
